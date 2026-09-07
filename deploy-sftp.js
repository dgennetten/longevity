import SftpClient from 'ssh2-sftp-client';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { DEPLOY_REMOTE_ROOT } from './deploy-remote-path.js';

function loadEnvFile(path) {
  try {
    const content = readFileSync(path, 'utf8');
    const lines = content.split('\n');
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          env[key] = value;
        }
      }
    }
    return env;
  } catch (err) {
    return {};
  }
}

function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push({
        local: fullPath,
        remote: '/' + relative(baseDir, fullPath).replace(/\\/g, '/')
      });
    }
  }
  
  return files;
}

async function deploy() {
  console.log('🚀 Starting SFTP deployment...\n');
  
  // Load environment variables
  const env = {
    ...loadEnvFile('.env'),
    ...loadEnvFile('.env.local')
  };
  
  const host = env.SFTP_HOST || env.FTP_HOST;
  const username = env.SFTP_USERNAME || env.FTP_USER;
  const password = env.SFTP_PASSWORD || env.FTP_PASSWORD;
  
  if (!host || !username || !password) {
    console.error('❌ Missing SFTP credentials in .env or .env.local');
    console.error('   Required: SFTP_HOST, SFTP_USERNAME, SFTP_PASSWORD');
    process.exit(1);
  }
  
  const sftp = new SftpClient();
  
  try {
    console.log(`📡 Connecting to ${host}...`);
    await sftp.connect({
      host,
      username,
      password,
      port: 22
    });
    console.log('✓ Connected\n');
    
    // Get all files from dist/
    const distFiles = getAllFiles('dist');
    console.log(`📦 Found ${distFiles.length} files to upload\n`);
    
    // Upload each file
    let uploaded = 0;
    for (const file of distFiles) {
      const remotePath = DEPLOY_REMOTE_ROOT + file.remote;
      const remoteDir = remotePath.substring(0, remotePath.lastIndexOf('/'));
      
      // Ensure remote directory exists
      try {
        await sftp.mkdir(remoteDir, true);
      } catch (err) {
        // Directory might already exist
      }
      
      // Upload file
      await sftp.put(file.local, remotePath);
      uploaded++;
      console.log(`  ✓ ${file.remote}`);
    }
    
    console.log(`\n✅ Deployed ${uploaded} files to ${host}${DEPLOY_REMOTE_ROOT}`);
    
  } catch (err) {
    console.error('❌ Deployment failed:', err.message);
    process.exit(1);
  } finally {
    await sftp.end();
  }
}

deploy();

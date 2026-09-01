import supplementsData from './data/supplements.json';
import type { Supplement } from './types/Supplement';
import AdminGuard from './components/AdminGuard';

const supplements = supplementsData as Supplement[];

function App() {
  const confirmedSupplements = supplements.filter(s => !s.considering);
  const consideringSupplements = supplements.filter(s => s.considering);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900">
            Longevity Matrix
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl">
            This is K. Douglas Gennetten's personal supplement record for Fort Collins.
            This is not medical advice and not a protocol for anyone else.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-100 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">Dose / Schedule</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">What it is</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">Primary Proponent</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {confirmedSupplements.map((supplement) => (
                  <tr key={supplement.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium text-neutral-900">
                        {supplement.name}
                        {supplement.rx && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Rx
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-neutral-700">
                      <div>{supplement.dose}</div>
                      {supplement.schedule && (
                        <div className="text-xs text-neutral-500 mt-0.5">{supplement.schedule}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-neutral-700">
                      <div>{supplement.description}</div>
                      {supplement.notes && (
                        <div className="text-xs text-neutral-500 mt-1 italic">{supplement.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-neutral-700">{supplement.primaryProponent}</td>
                    <td className="px-4 py-4 text-neutral-600 text-sm">{supplement.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {confirmedSupplements.map((supplement) => (
            <div
              key={supplement.id}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-neutral-900">{supplement.name}</h3>
                {supplement.rx && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Rx
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-neutral-700">Dose:</span>{' '}
                  <span className="text-neutral-600">{supplement.dose}</span>
                  {supplement.schedule && (
                    <span className="text-neutral-500"> • {supplement.schedule}</span>
                  )}
                </div>
                
                <div>
                  <span className="font-medium text-neutral-700">What it is:</span>{' '}
                  <span className="text-neutral-600">{supplement.description}</span>
                  {supplement.notes && (
                    <div className="text-xs text-neutral-500 mt-1 italic">{supplement.notes}</div>
                  )}
                </div>
                
                <div>
                  <span className="font-medium text-neutral-700">Primary Proponent:</span>{' '}
                  <span className="text-neutral-600">{supplement.primaryProponent}</span>
                </div>
                
                <div>
                  <span className="font-medium text-neutral-700">Why:</span>{' '}
                  <span className="text-neutral-600">{supplement.why}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Considering Section */}
        {consideringSupplements.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-neutral-700 mb-4 px-1">
              Considering / Not Confirmed
            </h2>
            
            {/* Desktop Table */}
            <div className="hidden lg:block bg-amber-50 rounded-lg shadow-sm border border-amber-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-amber-100 border-b border-amber-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700">Dose / Schedule</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700">What it is</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700">Primary Proponent</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-200">
                    {consideringSupplements.map((supplement) => (
                      <tr key={supplement.id} className="hover:bg-amber-100/50 transition-colors">
                        <td className="px-4 py-4 font-medium text-neutral-900">{supplement.name}</td>
                        <td className="px-4 py-4 text-neutral-700">
                          <div>{supplement.dose}</div>
                          {supplement.schedule && (
                            <div className="text-xs text-neutral-500 mt-0.5">{supplement.schedule}</div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-neutral-700">{supplement.description}</td>
                        <td className="px-4 py-4 text-neutral-700">{supplement.primaryProponent}</td>
                        <td className="px-4 py-4 text-neutral-600 text-sm">{supplement.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card */}
            <div className="lg:hidden space-y-4">
              {consideringSupplements.map((supplement) => (
                <div
                  key={supplement.id}
                  className="bg-amber-50 rounded-lg shadow-sm border border-amber-200 p-4"
                >
                  <h3 className="font-semibold text-lg text-neutral-900 mb-3">{supplement.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-neutral-700">Dose:</span>{' '}
                      <span className="text-neutral-600">{supplement.dose}</span>
                      {supplement.schedule && (
                        <span className="text-neutral-500"> • {supplement.schedule}</span>
                      )}
                    </div>
                    
                    <div>
                      <span className="font-medium text-neutral-700">What it is:</span>{' '}
                      <span className="text-neutral-600">{supplement.description}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-neutral-700">Primary Proponent:</span>{' '}
                      <span className="text-neutral-600">{supplement.primaryProponent}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-neutral-700">Why:</span>{' '}
                      <span className="text-neutral-600">{supplement.why}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-neutral-600 text-center">
            © 2026 K. Douglas Gennetten •{' '}
            <a
              href="https://gennetten.org"
              className="text-blue-600 hover:text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              gennetten.org
            </a>
          </p>
        </div>
      </footer>
      </div>
    </AdminGuard>
  );
}

export default App;

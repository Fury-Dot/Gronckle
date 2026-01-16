import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-mint-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-mint-800">Privacy Policy</CardTitle>
            <p className="text-sm text-mint-600">Last Updated: January 2026</p>
          </CardHeader>
          <CardContent className="space-y-6 text-mint-900">
            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">1. Information We Collect</h2>
              <p className="mb-4">
                We collect minimal personal information to provide and improve our service. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Email address (for account creation and gem submissions)</li>
                <li>Basic account information (username, profile picture)</li>
                <li>Content you submit to our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">3. Cookies and Similar Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our service and maintain certain information. These are used to keep users logged in (via Supabase) and to enhance your experience on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">4. Third-Party Services</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We only share information with third parties that help us operate our website, conduct our business, or serve our users, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
              </p>
            </section>

            <div className="text-sm text-mint-600 mt-8">
              If you have any questions about this Privacy Policy, please contact us.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

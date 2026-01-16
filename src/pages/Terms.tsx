import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-mint-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-mint-800">Terms of Service</CardTitle>
            <p className="text-sm text-mint-600">Last Updated: January 2026</p>
          </CardHeader>
          <CardContent className="space-y-6 text-mint-900">
            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">1. Ownership</h2>
              <p className="mb-4">
                Gronckle and its original content, features, and functionality are owned by Lithish and are protected by international copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">2. User Content</h2>
              <p className="mb-4">
                By submitting content to our platform, including but not limited to gem submissions, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and display such content in connection with the operation of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">3. Termination</h2>
              <p className="mb-4">
                We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-mint-800 mb-2">4. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. We will provide notice of any changes by updating the "Last Updated" date at the top of this page.
              </p>
            </section>

            <div className="text-sm text-mint-600 mt-8">
              If you have any questions about these Terms, please contact us.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

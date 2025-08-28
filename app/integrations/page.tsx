import { IntegrationHub } from "@/components/integration-hub"

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-balance">Integrations</h1>
          <p className="text-muted-foreground text-pretty">
            Connect your favorite tools and automate your meeting workflows
          </p>
        </div>
        <IntegrationHub />
      </div>
    </div>
  )
}

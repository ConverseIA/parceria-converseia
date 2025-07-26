import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  Award,
  Download,
  FileText,
  Video,
  MessageSquare,
  Target,
  Zap,
  Crown
} from "lucide-react";
// import logo from "@/assets/converseia-logo.png";

interface PartnerData {
  name: string;
  companyName: string;
  email: string;
  companyType: string;
}

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('partnerData');
    if (data) {
      setPartnerData(JSON.parse(data));
    } else {
      // Se não há dados do parceiro, redireciona para cadastro
      navigate('/parceria/cadastro');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('partnerData');
    navigate('/parceria');
  };

  if (!partnerData) {
    return <div>Carregando...</div>;
  }

  const salesData = {
    totalSales: 0,
    commission: 0,
    recurringCommission: 0,
    nextTier: 50000,
    currentProgress: 0
  };

  const resources = [
    { title: "Kit de Vendas Completo", type: "PDF", icon: FileText },
    { title: "Apresentação da Solução", type: "PPT", icon: FileText },
    { title: "Vídeo de Demonstração", type: "MP4", icon: Video },
    { title: "Scripts de Qualificação", type: "PDF", icon: MessageSquare },
    { title: "Cases de Sucesso", type: "PDF", icon: Award },
    { title: "Materiais de Marketing", type: "ZIP", icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/iconecomaprincipalcornalogoefundobranco.png" alt="ConverseIA Direito" className="w-10 h-10 mr-3" />
              <div>
                <h1 className="text-xl font-bold">ConverseIA Direito</h1>
                <p className="text-sm text-muted-foreground">Painel do Parceiro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Crown className="w-4 h-4 mr-1" />
                Parceiro Certificado
              </Badge>
              <div className="text-right">
                <p className="font-medium">{partnerData.name}</p>
                <p className="text-sm text-muted-foreground">{partnerData.companyName}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>Sair</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Bem-vindo, {partnerData.name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Você está pronto para revolucionar o setor jurídico com IA. Comece explorando os recursos disponíveis.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {salesData.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissão Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">35%</div>
              <p className="text-xs text-muted-foreground">Próximo nível: 50%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Escritórios atendidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Meta</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 50k</div>
              <p className="text-xs text-muted-foreground">Para comissão 50%</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Next Tier */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 text-primary mr-2" />
              Progresso para Próximo Nível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>R$ {salesData.totalSales}</span>
                <span>R$ {salesData.nextTier.toLocaleString()}</span>
              </div>
              <Progress value={(salesData.totalSales / salesData.nextTier) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Você precisa de mais R$ {(salesData.nextTier - salesData.totalSales).toLocaleString()} em vendas para atingir comissão de 50%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="support">Suporte</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <Card>
                <CardHeader>
                  <CardTitle>Primeiros Passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Baixar Kit de Vendas</p>
                      <p className="text-sm text-muted-foreground">Materiais essenciais para apresentações</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Configurar sua conta com desconto</p>
                      <p className="text-sm text-muted-foreground">70% de desconto para demonstrações</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Contatar primeiro lead</p>
                      <p className="text-sm text-muted-foreground">Começar vendas qualificadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estrutura de Comissões</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Comissão Padrão</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">35%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Em todas as vendas e renovações</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Desconto Plataforma</span>
                      <Badge variant="secondary">70%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Para demonstrações aos clientes</p>
                  </div>
                  
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Após R$ 50k</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">50%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Comissão premium permanente</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-primary" />
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leads Disponíveis</CardTitle>
                <p className="text-muted-foreground">
                  Escritórios de advocacia interessados em automação com IA
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Nenhum lead disponível ainda</h3>
                  <p className="text-muted-foreground mb-6">
                    Nossa equipe está preparando uma lista qualificada de escritórios interessados para você.
                  </p>
                  <Button variant="outline">Solicitar Leads</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Card>
                <CardHeader>
                  <CardTitle>Contatos de Suporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Equipe de Parcerias</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para questões sobre vendas e comissões</p>
                    <Button variant="outline" size="sm">Entrar em Contato</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Suporte Técnico</h4>
                    <p className="text-sm text-muted-foreground mb-2">Ajuda com a plataforma e implementação</p>
                    <Button variant="outline" size="sm">Abrir Ticket</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treinamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Onboarding de Parceiros</h4>
                    <p className="text-sm text-muted-foreground mb-2">Treinamento inicial completo</p>
                    <Button variant="outline" size="sm">Assistir</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Técnicas de Vendas</h4>
                    <p className="text-sm text-muted-foreground mb-2">Como vender para advogados</p>
                    <Button variant="outline" size="sm">Assistir</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
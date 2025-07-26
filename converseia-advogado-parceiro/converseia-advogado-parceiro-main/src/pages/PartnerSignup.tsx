import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building, User, Globe, Users, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/converseia-logo.png";

export default function PartnerSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    companyName: "",
    companyType: "",
    instagram: "",
    website: "",
    employees: "",
    clients: "",
    country: "",
    city: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Redirecionando para o painel do parceiro...",
      variant: "default"
    });
    
    // Salvar dados do parceiro no localStorage para simular autenticação
    localStorage.setItem('partnerData', JSON.stringify(formData));
    
    setTimeout(() => {
      navigate('/parceria/painel');
    }, 1500);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/parceria" className="flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <div className="flex items-center">
            <img src={logo} alt="ConverseIA Direito" className="w-10 h-10 mr-3" />
            <span className="text-xl font-bold">ConverseIA Direito</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 shadow-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Cadastro de Parceiro</CardTitle>
              <p className="text-muted-foreground">
                Preencha os dados abaixo para se tornar um parceiro oficial da ConverseIA Direito
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">Contato</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">Número do WhatsApp</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                        <span className="text-sm">🇧🇷</span>
                      </div>
                      <Input
                        id="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Dados da Empresa */}
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <Building className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">Sobre a empresa</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="companyName">Nome da empresa</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Nome da sua empresa"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyType">Tipo da empresa</Label>
                    <Select onValueChange={(value) => handleInputChange('companyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agencia-marketing">Agência de Marketing Jurídico</SelectItem>
                        <SelectItem value="consultoria">Consultoria de Gestão</SelectItem>
                        <SelectItem value="lawtech">Lawtech/Legaltech</SelectItem>
                        <SelectItem value="ti">Empresa de TI</SelectItem>
                        <SelectItem value="freelancer">Freelancer/Consultor</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram ou LinkedIn</Label>
                    <Input
                      id="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="@usuario ou linkedin.com/in/usuario"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Site (opcional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://seusite.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employees">Quantidade de funcionários</Label>
                      <Select onValueChange={(value) => handleInputChange('employees', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Apenas eu</SelectItem>
                          <SelectItem value="2-5">2-5 funcionários</SelectItem>
                          <SelectItem value="6-10">6-10 funcionários</SelectItem>
                          <SelectItem value="11-50">11-50 funcionários</SelectItem>
                          <SelectItem value="50+">Mais de 50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="clients">Quantidade de clientes</Label>
                      <Select onValueChange={(value) => handleInputChange('clients', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-10">0-10 clientes</SelectItem>
                          <SelectItem value="11-50">11-50 clientes</SelectItem>
                          <SelectItem value="51-100">51-100 clientes</SelectItem>
                          <SelectItem value="100+">Mais de 100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="Brasil"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar uma conta"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
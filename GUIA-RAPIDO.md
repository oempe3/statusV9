# Guia de Implantação Rápida - GitHub Pages

## Passos Essenciais

### 1. Configurar Google Apps Script
1. Acesse [script.google.com](https://script.google.com)
2. Crie novo projeto e cole o código do arquivo `codigo-corrigido.gs`
3. Vá em **Implantar** > **Nova implantação** > **Aplicativo da Web**
4. Configure:
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
5. **COPIE A URL GERADA** (será algo como: `https://script.google.com/macros/s/ABC123.../exec`)

### 2. Atualizar Endpoints
Substitua a URL do endpoint nos arquivos:
- `status.html` (linha ~145)
- `entrada.html` (linha ~430)

Procure por:
```javascript
const endpoint = "https://script.google.com/macros/s/AKfycbx9FJ28tJf_h5C4owFjNthBYgNMbkgvzTokk4vL9Asee_1E08pExsSwyYR67Txv9Y476w/exec";
```

E substitua pela sua URL do Google Apps Script.

### 3. Implantar no GitHub Pages
1. Crie repositório no GitHub
2. Faça upload dos arquivos HTML, CSS e PNG
3. Vá em **Settings** > **Pages**
4. Selecione **Deploy from a branch** > **main** > **/ (root)**
5. Aguarde alguns minutos

### 4. Testar
Acesse: `https://seu-usuario.github.io/nome-do-repositorio`

**Credenciais:**
- Usuário: qualquer
- Senha: `p3rnambuco3`

## Problemas Comuns

**"Erro ao carregar dados":**
- Verifique se o Google Apps Script está implantado
- Confirme se a URL do endpoint foi atualizada
- Teste o script diretamente no Google Apps Script

**Dados não aparecem:**
- Verifique se a planilha tem dados além do cabeçalho
- Confirme se o ID da planilha no script está correto
- Verifique se a aba se chama "Dados"


# Sistema de Monitoramento de Equipamentos - Pernambuco III

## Descrição
Sistema web para monitoramento em tempo real do status de equipamentos, com interface de visualização e entrada de dados integrada ao Google Sheets.

## Estrutura do Projeto
- `index.html` - Página de login
- `status.html` - Dashboard de visualização dos equipamentos
- `entrada.html` - Interface para edição dos dados
- `style.css` - Estilos CSS do sistema
- `codigo-corrigido.gs` - Script Google Apps Script atualizado

## Configuração do Google Apps Script

### 1. Criar o Google Apps Script
1. Acesse [script.google.com](https://script.google.com)
2. Clique em "Novo projeto"
3. Cole o código do arquivo `codigo-corrigido.gs`
4. Salve o projeto com um nome descritivo

### 2. Configurar a Planilha
1. Certifique-se de que sua planilha Google Sheets tenha o ID: `1o_ouKluK-7TEFBG4EVD_9IEaD7ToIeJaxZzg1livsWM`
2. A aba deve se chamar "Dados"
3. A primeira linha deve conter os cabeçalhos das colunas

### 3. Implantar o Script
1. No editor do Google Apps Script, clique em "Implantar" > "Nova implantação"
2. Escolha o tipo "Aplicativo da Web"
3. Configure:
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
4. Clique em "Implantar"
5. Copie a URL do aplicativo web implantado
6. **IMPORTANTE**: Atualize a variável `endpoint` nos arquivos `status.html` e `entrada.html` com a nova URL

### 4. Atualizar o Endpoint nos Arquivos HTML
Substitua a linha que contém:
```javascript
const endpoint = "https://script.google.com/macros/s/AKfycbx9FJ28tJf_h5C4owFjNthBYgNMbkgvzTokk4vL9Asee_1E08pExsSwyYR67Txv9Y476w/exec";
```

Pela nova URL gerada na implantação do seu script.

## Implantação no GitHub Pages

### 1. Criar Repositório no GitHub
1. Crie um novo repositório no GitHub
2. Faça upload de todos os arquivos HTML, CSS e PNG
3. **NÃO** inclua o arquivo `.gs` no repositório

### 2. Ativar GitHub Pages
1. Vá para Settings > Pages no seu repositório
2. Selecione "Deploy from a branch"
3. Escolha "main" como branch
4. Escolha "/ (root)" como pasta
5. Clique em "Save"

### 3. Acessar o Sistema
Após alguns minutos, o sistema estará disponível em:
`https://seu-usuario.github.io/nome-do-repositorio`

## Credenciais de Acesso
- **Usuário**: Qualquer nome de usuário
- **Senha**: p3rnambuco3

## Funcionalidades

### Dashboard de Status (`status.html`)
- Visualização em tempo real dos equipamentos
- Filtros por nome e status
- Estatísticas resumidas
- Atualização automática a cada 30 segundos
- Interface responsiva

### Entrada de Dados (`entrada.html`)
- Edição linha por linha dos equipamentos
- Campos condicionais baseados no status
- Validação de dados
- Feedback visual das operações

## Estrutura da Planilha Google Sheets
A planilha deve ter as seguintes colunas (na ordem):
- **A**: TAG (Identificador do equipamento)
- **B**: STATUS (OPE, ST-BY, MNT)
- **C**: MOTIVO
- **D**: PTS
- **E**: OS
- **F**: RETORNO (Data/hora)
- **G**: CADEADO
- **H**: OBSERVACOES
- **I**: MODIFICADO_POR
- **J**: DATA (Data/hora da modificação)

## Solução de Problemas

### Erro "Erro ao carregar dados"
1. Verifique se o Google Apps Script está implantado corretamente
2. Confirme se a URL do endpoint está atualizada nos arquivos HTML
3. Verifique se a planilha está acessível e tem as colunas corretas
4. Teste o script diretamente no Google Apps Script usando a função `testScript()`

### Dados não aparecem
1. Verifique se há dados na planilha (além do cabeçalho)
2. Confirme se o ID da planilha no script está correto
3. Verifique se o nome da aba é "Dados"

### Problemas de CORS
O script foi configurado para permitir requisições de qualquer origem. Se ainda houver problemas:
1. Reimplante o Google Apps Script
2. Aguarde alguns minutos para propagação
3. Limpe o cache do navegador

## Manutenção
- O sistema atualiza automaticamente os dados a cada 30 segundos
- Para forçar atualização, clique no botão "Atualizar"
- Monitore os logs do Google Apps Script para identificar possíveis erros

## Suporte
Para problemas técnicos, verifique:
1. Console do navegador (F12) para erros JavaScript
2. Logs do Google Apps Script
3. Status da planilha Google Sheets


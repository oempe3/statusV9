/**
 * Configurações globais
 */
const CONFIG = {
  SHEET_ID: '1o_ouKluK-7TEFBG4EVD_9IEaD7ToIeJaxZzg1livsWM',
  SHEET_NAME: 'Dados'
};

/**
 * Função para lidar com requisições GET
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    if (!ss) {
      return createJSONResponse({ error: 'Planilha não encontrada. Verifique o ID.' });
    }

    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      return createJSONResponse({ error: `Aba "${CONFIG.SHEET_NAME}" não encontrada.` });
    }

    const range = sheet.getDataRange();
    const values = range.getValues();
    
    if (values.length === 0) {
      return createJSONResponse({ data: [] });
    }

    const headers = values[0];
    const data = [];

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = row[j] !== null ? row[j] : '';
      }
      data.push(rowObject);
    }

    return createJSONResponse({ data: data });

  } catch (error) {
    console.error('Erro no doGet:', error);
    return createJSONResponse({ error: error.message });
  }
}

/**
 * Função para lidar com requisições POST
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    if (!ss) {
      return createJSONResponse({ error: 'Planilha não encontrada. Verifique o ID.' });
    }

    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      return createJSONResponse({ error: `Aba "${CONFIG.SHEET_NAME}" não encontrada.` });
    }

    const requestData = JSON.parse(e.postData.contents);
    if (!requestData.type || !requestData.TAG) {
      return createJSONResponse({ error: 'Campos obrigatórios ausentes: "type" ou "TAG".' });
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const tagColumn = headers.indexOf('TAG');
    if (tagColumn === -1) {
      return createJSONResponse({ error: 'Coluna "TAG" não encontrada na planilha.' });
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let rowIndex = -1;

    for (let i = 1; i < values.length; i++) {
      if (values[i][tagColumn] === requestData.TAG) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      return createJSONResponse({ error: `TAG "${requestData.TAG}" não encontrada.` });
    }

    const updatedRow = values[rowIndex];
    for (const field in requestData) {
      const colIndex = headers.indexOf(field);
      if (colIndex !== -1 && field !== 'type' && field !== 'TAG') {
        updatedRow[colIndex] = requestData[field] !== undefined ? requestData[field] : '';
      }
    }

    sheet.getRange(rowIndex + 1, 1, 1, updatedRow.length).setValues([updatedRow]);

    return createJSONResponse({
      success: true,
      message: 'Linha atualizada com sucesso!',
      updatedData: updatedRow
    });

  } catch (error) {
    console.error('Erro no doPost:', error);
    return createJSONResponse({
      success: false,
      error: error.message
    });
  }
}

/**
 * Helper para criar respostas JSON com CORS
 */
function createJSONResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Função para testar localmente
 */
function testScript() {
  // Teste doGet
  const getResult = doGet({});
  console.log("doGet Result:", getResult.getContent());

  // Teste doPost
  const testData = {
    type: 'update_row',
    TAG: 'TAG_EXEMPLO',
    STATUS: 'OPE',
    OBSERVACOES: 'Teste de atualização via script'
  };

  const simulatedPostEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const postResult = doPost(simulatedPostEvent);
  console.log("doPost Result:", postResult.getContent());
}


// Bibliotecas
// Configura
const supertest = require("supertest");     // Framework de Teste de API
const assert = require("chai").assert;      // Função de assertiva do resultado

// Constantes, variáveis e objetos
const baseUrl = "https://petstore.swagger.io/v2";   // url base da API
const petId = 20230714;                             // codigo do animal

// Descrição = Conjunto de testes

describe(' PetStore Swagger - Pet', () => {
    const request = supertest(baseUrl);

    // Post - incluir um registro
    it('Post Pet', () => {
        // Configura
        const jsonFile = require('../../seleniumApi/vendors//json/pet1.json');

        // realizar a requisição e receber a resposta
        return request
            .post('/pet') // Endpoint - função para incluir um registro
            .send(jsonFile) // Envia os dados do cadastro no corpo da requisição

            // Valida
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, 20230714);
                assert.equal(response.body.category.id, 200);
                assert.equal(response.body.category.name, "cat");
                assert.equal(response.body.name, "Bananinha");
                assert.equal(response.body.status, "Disponível");
            });
        
    });

    it('Get Pet', () => {
        
        return request
            .get('/pet/' + petId)
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, 20230714);
                assert.equal(response.body.category.id, 200);
                assert.equal(response.body.category.name, "cat");
                assert.equal(response.body.name, "Bananinha");
                assert.equal(response.body.status, "Disponível");
            });
    });

    it('Put Pet', () => {
        
        const jsonFile = require('../vendors/json/pet2.json')

        return request
            .put('/pet')
            .send(jsonFile)
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, 'Bananinha');
                assert.equal(response.body.tags[1].id, 4);
                assert.equal(response.body.tags[1].name, 'Castrated');
            })

    });

    it('Delete Pet', () => {
        
        return request
            .delete('/pet/' + petId)
            .then((response) => {
                assert.equal(response.statusCode, 200)
            });
    });
});
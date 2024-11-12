using treinamento as t from '../db/schema';
using V_TESTE as V from  '../db/schema';

service MyService @(path: '/master') {
    entity Usuario as projection on t.Usuarios;
    entity Veiculo as projection on t.Veiculos;
    entity Endereco as projection on t.Endereco;
    entity Contato as projection on t.Contatos;

    //Entidade nova apontando para a Calculation View
    @readonly
    entity V_Exemplo as projection on V;

    function teste() returns String(11)
}
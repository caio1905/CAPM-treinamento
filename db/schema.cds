//namespace treinamento;

using {managed} from '@sap/cds/common';

context treinamento {
    entity Usuarios : managed {
        key cpf            : String(11);
            nome           : String(80);
            dataNascimento : Date;
            sexo           : Integer enum {
                Masculino = 1;
                Feminino  = 2;
                Outros    = 3;
            };
            veiculos       : Association to many Veiculos
                                 on veiculos.cpf = cpf;
            contatos       : Association to many Contatos
                                 on contatos.cpf = cpf;
            endereco       : Association to many Endereco
                                 on endereco.cpf = cpf;
    }

    entity Veiculos {
        key id     : Integer;
        key cpf    : String(11);
            marca  : String(50);
            modelo : String(50);
            preco  : Decimal(11, 2);
            moeda  : Integer enum {
                BRL    = 1;
                USD    = 2;
                EUR    = 3;
                Outras = 4;
            };
    }

    entity Contatos {
        key id       : Integer;
        key cpf      : String(11);
            email    : String(80);
            telefone : String(20);
    }

    entity Endereco {
        key id         : Integer;
        key cpf        : String(11);
            logradouro : String(100);
            numero     : String(5);
            bairro     : String(30);
            pais       : String(40);
    }

    entity relatorio as
        select from Usuarios as u
        inner join Veiculos as v
            on u.cpf = v.cpf
        {
            key u.cpf,
                u.nome,
                v.marca,
                v.modelo,
                v.preco,
                case v.moeda
                    when
                        1
                    then
                        'Real'
                    when
                        2
                    then
                        'Dolar'
                    when
                        3
                    then
                        'Euro'
                    when
                        4
                    then
                        'Outras'
                end as moeda : String(30),
                case u.sexo
                    when
                        1
                    then
                        'Masculino'
                    when
                        2
                    then
                        'Feminino'
                    when
                        3
                    then
                        'Outros'
                end as sexo  : String(20)
        };
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity V_TESTE {
key     CPF: String(11)  @title: 'CPF: CPF' ; 
        NOME: String(80)  @title: 'NOME: NOME' ; 
        DATANASCIMENTO: Date  @title: 'DATANASCIMENTO: DATANASCIMENTO' ; 
        MARCA: String(50)  @title: 'MARCA: MARCA' ; 
        MODELO: String(50)  @title: 'MODELO: MODELO' ; 
        PRECO: Decimal(11)  @title: 'PRECO: PRECO' ; 
        MOEDA: Integer  @title: 'MOEDA: MOEDA' ; 
        EMAIL: String(80)  @title: 'EMAIL: EMAIL' ; 
        TELEFONE: String(20)  @title: 'TELEFONE: TELEFONE' ; 
        LOGRADOURO: String(100)  @title: 'LOGRADOURO: LOGRADOURO' ; 
        NUMERO: String(5)  @title: 'NUMERO: NUMERO' ; 
        BAIRRO: String(30)  @title: 'BAIRRO: BAIRRO' ; 
        PAIS: String(40)  @title: 'PAIS: PAIS' ; 
        IDADE: Integer  @title: 'IDADE: IDADE' ; 
        SEXO: Integer  @title: 'SEXO: SEXO' ; 
}

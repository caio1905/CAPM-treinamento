const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {
    const srv = await cds.connect.to("db")

    const validarCPF = async cpf => {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência de números iguais
        }

        let soma = 0;
        let resto;

        // Validação do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        soma = 0;

        // Validação do segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }

    // const getNumberId = async (param) => {
    //     var dataVeiculos = await srv.read(param)
    //     if (dataVeiculos.length) {
    //         return dataVeiculos.length + 1
    //     } else {
    //         return 1
    //     }
    // }

    this.before('CREATE', 'Usuario', async req => {
        const data = req.data

        const iTest = await validarCPF(data.cpf)

        if (iTest === false) {
            req.error({
                code: 'CPF Invalido',
                message: 'Verifique os digitos do CPF',
                target: 'CPF',
                status: 400
            })
        }
    })

    this.on('teste', async req => {
        debugger
        console.log('Meu nome é Caio')
    })

    this.before('CREATE', 'Veiculo', async req => {
        try {
            const dataUsuarios = await srv.read('MYSERVICE_USUARIO')
            console.log(req)
            console.log(dataUsuarios)

            // req.data.id = getNumberId('MYSERVICE_VEICULO')
            const data = req.data

            const iTest = await validarCPF(data.cpf)
            if (iTest === false) {
                req.error({
                    code: '400',
                    message: 'Verifique os digitos do CPF',
                    target: 'CPF',
                    status: 400
                })
            }

            if (dataUsuarios.length > 0) {
                const results = dataUsuarios.filter(usuario => {
                    if (usuario.CPF === data.cpf) {
                        return usuario
                    }
                })

                if (results.length === 0) {
                    req.error({
                        code: '400',
                        message: 'Não existe Usuário cadastrado para esse CPF',
                        target: 'CPF',
                        status: 400
                    })
                }
            } else {
                req.error({
                    code: '400',
                    message: 'Não existem Usuários cadastrados na tabela, impossivel gravar!',
                    target: 'Nenhum dado encontrado',
                    status: 400
                })
            }
            console.log(req)

        } catch (e) {
            console.log(e)
            req.error({
                code: '500',
                message: `${e}`,
                target: 'Exception',
                status: 500
            })
        }
    })

    this.before('CREATE', 'Contato', async req => {
        try {
            const dataUsuarios = await srv.read('MYSERVICE_USUARIO')
            console.log(dataUsuarios)
            //req.data.id = getNumberId('MYSERVICE_CONTATO')
            const data = req.data

            const iTest = await validarCPF(data.cpf)
            if (iTest === false) {
                req.error({
                    code: '400',
                    message: 'Verifique os digitos do CPF',
                    target: 'CPF',
                    status: 400
                })

                return
            }

            if (dataUsuarios.length > 0) {
                const results = dataUsuarios.filter(usuario => {
                    if (usuario.CPF === data.cpf) {
                        return usuario
                    }
                })

                if (results.length === 0) {
                    req.error({
                        code: '400',
                        message: 'Não existe Usuário cadastrado para esse CPF',
                        target: 'CPF',
                        status: 400
                    })
                }
            } else {
                req.error({
                    code: '400',
                    message: 'Não existe Usuários cadastrados na tabela, impossivel gravar!',
                    target: 'Nenhum dado encontrado',
                    status: 400
                })
            }

        } catch (e) {
            console.log(e)
            req.error({
                code: '500',
                message: `${e}`,
                target: 'Exception',
                status: 500
            })
        }
    })

    this.before('CREATE', 'Endereco', async req => {
        try {
            const dataUsuarios = await srv.read('MYSERVICE_USUARIO')
            console.log(dataUsuarios)
            //req.data.id = getNumberId('MYSERVICE_ENDERECO')
            const data = req.data

            const iTest = await validarCPF(data.cpf)
            if (iTest === false) {
                req.error({
                    code: '400',
                    message: 'Verifique os digitos do CPF',
                    target: 'CPF',
                    status: 400
                })

                return
            }

            if (dataUsuarios.length > 0) {
                const results = dataUsuarios.filter(usuario => {
                    if (usuario.CPF === data.cpf) {
                        return usuario
                    }
                })

                if (results.length === 0) {
                    req.error({
                        code: '400',
                        message: 'Não existe Usuário cadastrado para esse CPF',
                        target: 'CPF',
                        status: 400
                    })
                }
            } else {
                req.error({
                    code: '400',
                    message: 'Não existe Usuários cadastrados na tabela, impossivel gravar!',
                    target: 'Nenhum dado encontrado',
                    status: 400
                })
            }

        } catch (e) {
            console.log(e)
            req.error({
                code: '500',
                message: `${e}`,
                target: 'Exception',
                status: 500
            })
        }
    })
})
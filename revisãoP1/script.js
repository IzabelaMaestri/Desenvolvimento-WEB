

// Garante que o script só execute após o DOM estar completamente carregado
$(document).ready(function() {

    // Cache dos elementos do formulário para melhor performance
    const $form = $('#myForm');
    const $submitBtn = $('#submitBtn');
    const $cancelBtn = $('#cancelBtn');
    const $successMessage = $('#successMessage');
    const $emailInput = $('#inputEmail');
    const $dateInput = $('#inputDate');
    const $numberInput = $('#inputNumber');
    const $selectInput = $('#inputSelect');
    const $checkboxInput = $('#inputCheckbox');
    const $switchInput = $('#inputSwitch');

    /**
     * Função para validar o formulário
     * Verifica se todos os campos obrigatórios estão preenchidos
     * e se o switch está ativo.
     * @returns {boolean} True se o formulário for válido, False caso contrário.
     */
    function validateForm() {
        let isValid = true;
        let errorMessage = '';

        // Validação de campos de texto, data, número e seletor
        // Remove espaços em branco antes de verificar se está vazio
        if ($emailInput.val().trim() === '') {
            isValid = false;
            errorMessage += '<li>O campo E-mail é obrigatório.</li>';
        }
        if ($dateInput.val() === '') {
            isValid = false;
            errorMessage += '<li>O campo Data é obrigatório.</li>';
        }
        if ($numberInput.val().trim() === '') {
            isValid = false;
            errorMessage += '<li>O campo Número é obrigatório.</li>';
        }
        if ($selectInput.val() === '' || $selectInput.val() === 'Selecione...') { // Verifica se selecionou algo diferente do placeholder
            isValid = false;
            errorMessage += '<li>Selecione uma opção.</li>';
        }

        // Validação do checkbox (opcional, dependendo da regra de negócio, mas o exercício não pede)
        // if (!$checkboxInput.is(':checked')) {
        //     isValid = false;
        //     errorMessage += '<li>Você deve concordar com os termos.</li>';
        // }

        // Validação do switch
        if (!$switchInput.is(':checked')) {
            isValid = false;
            errorMessage += '<li>O switch de ativação deve estar ligado.</li>';
        }

        // Se houver erros, exibe-os (pode ser um alert simples ou um modal de erro)
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios e ative o switch:\n\n' + errorMessage.replace(/<li>/g, '• ').replace(/<\/li>/g, '\n'));
        }

        return isValid;
    }

    // Evento de clique para o botão "Enviar"
    $submitBtn.on('click', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Se o formulário for válido, mostra a mensagem de sucesso
            $successMessage.removeClass('d-none alert-danger').addClass('alert-success-custom').text('Formulário enviado com sucesso!').show();
            // Opcional: Limpar o formulário após o sucesso
            $form[0].reset(); // Reseta o formulário HTML nativo
            $successMessage.fadeOut(5000); // Esconde a mensagem após 5 segundos
        } else {
            // Se o formulário não for válido, podemos também exibir uma mensagem de erro na tela
            // Neste exemplo, a função validateForm já exibe um alert
            $successMessage.removeClass('alert-success-custom').addClass('d-none').hide(); // Oculta qualquer mensagem de sucesso anterior
        }
    });

    // Evento de clique para o botão "Cancelar"
    $cancelBtn.on('click', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Mostra o modal de confirmação
        $('#cancelModal').modal('show');
    });

    // Evento de clique para o botão "Sim, Cancelar" dentro do modal
    $('#confirmCancelBtn').on('click', function() {
        // Oculta o modal
        $('#cancelModal').modal('hide');
        // Reseta o formulário
        $form[0].reset();
        // Oculta a mensagem de sucesso, caso esteja visível
        $successMessage.hide();
        alert('As informações preenchidas foram perdidas.');
    });

});
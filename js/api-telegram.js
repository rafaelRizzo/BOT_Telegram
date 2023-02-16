const copy_pix_toast = document.querySelector("#copy_pix")
const error_copy_pix_toast = document.querySelector("#error_copy_pix")
const success_image_toast = document.querySelector("#success_image")
const success_message_toast = document.querySelector("#success_message")
const error_input_toast = document.querySelector("#error_input")
const error_url_toast = document.querySelector("#error_url")
const error_message_toast = document.querySelector("#error_message")
const error_bot_toast = document.querySelector("#error_bot")
const error_termo_toas = document.querySelector("#error_termo")

const container_copy = document.querySelector(".container_copy")
const inputPix = document.querySelector("#input_cod_pix")

container_copy.addEventListener("click", () => {
    navigator.clipboard.writeText(inputPix.value).then(function () {
        // console.log('Async: Copying to clipboard was successful!');
        copy_pix_toast.click()
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
        error_copy_pix_toast.click()
    });

})

const termo = document.querySelector("#termo")

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
})

document.querySelector("#enviar_mensagem").addEventListener("click", () => {


    let inputToken = document.getElementById("token_BOT").value.trim()
    let inputChat = document.getElementById("chat_ID_BOT").value.trim()

    if (termo.checked == true) {
        if (inputToken != "" && inputChat != "") {
            let bot = {
                TOKEN: inputToken,
                chatID: inputChat
            }

            let message = document.querySelector("#mensagem").value
            let photo = document.querySelector("#image_url").value


            let urlMessage = `https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${message}`;

            if (photo != "" && message != "") {

                let urlImage = `https://api.telegram.org/bot${bot.TOKEN}/sendPhoto?chat_id=${bot.chatID}&photo=${photo}`;


                const sendPhoto = () => {
                    fetch(urlImage, { method: "GET" })
                        .then(success => {
                            switch (success.status) {
                                case 404:
                                    console.log(`Erro com a conexão do BOT, verifique o TOKEN e o CHAT ID novamente.`)
                                    error_bot_toast.click()
                                    break;
                                case 200:
                                    console.log(`Imagem enviada com sucesso !`)
                                    sendMessage()
                                    break;
                                default:
                                    console.log(`Ocorreu um erro com o envio da imagem, verifique a URL novamente ou tente outra!`)
                                    error_url_toast.click()
                                    break;
                            }
                        }, error => { console.log(`Falha ao enviar imagem ! erro: ${error}`) })
                }
                sendPhoto()


                const sendMessage = () => {
                    fetch(urlMessage, { method: "GET" })
                        .then(success => {
                            switch (success.status) {
                                case 404:
                                    console.log(`Erro com a conexão do BOT, verifique o TOKEN e o CHAT ID novamente.`)
                                    error_bot_toast.click()
                                    break;
                                case 200:
                                    console.log(`Mesangem enviada com sucesso !`)
                                    success_image_toast.click()
                                    success_message_toast.click()
                                    break;
                                default:
                                    console.log(`Ocorreu um erro com o envio da menssagem!`)
                                    error_message_toast.click()
                                    break;
                            }
                        }, error => { console.log(`Falha ao enviar a mensagem ! erro: ${error}`) })
                }
            } else if (photo != "") {
                let urlImage = `https://api.telegram.org/bot${bot.TOKEN}/sendPhoto?chat_id=${bot.chatID}&photo=${photo}`;


                const sendPhoto = () => {
                    fetch(urlImage, { method: "GET" })
                        .then(success => {
                            switch (success.status) {
                                case 404:
                                    console.log(`Erro com a conexão do BOT, verifique o TOKEN e o CHAT ID novamente.`)
                                    error_bot_toast.click()
                                    break;
                                case 200:
                                    console.log(`Imagem enviada com sucesso !`)
                                    success_image_toast.click()
                                    break;
                                default:
                                    console.log(`Ocorreu um erro com o envio da imagem, verifique a URL novamente ou tente outra!`)
                                    error_url_toast.click()
                                    break;
                            }
                        }, error => { console.log(`Falha ao enviar imagem ! erro: ${error}`) })
                }
                sendPhoto()
            } else {
                const sendMessage = () => {
                    fetch(urlMessage, { method: "GET" })
                        .then(success => {
                            switch (success.status) {
                                case 404:
                                    console.log(`Erro com a conexão do BOT, verifique o TOKEN e o CHAT ID novamente.`)
                                    error_bot_toast.click()
                                    break;
                                case 200:
                                    console.log(`Mesangem enviada com sucesso !`)
                                    success_message_toast.click()
                                    break;
                                default:
                                    console.log(`Ocorreu um erro com o envio da menssagem!`)
                                    error_message_toast.click()
                                    break;
                            }
                        }, error => { console.log(`Falha ao enviar a mensagem ! erro: ${error}`) })
                }
                sendMessage()
            }

        } else {
            console.log(`Erro! é obrigatório preencher o TOKEN e o CHAT ID!`)
            error_input_toast.click()
        }
    } else {
        console.log(`Erro! é nessário concordar os com termos`)
        error_termo_toas.click()
    }
})
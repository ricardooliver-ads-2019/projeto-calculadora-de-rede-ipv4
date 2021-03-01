


const Form = {

    
    //ip: document.querySelector("input#ip"),
    ipBox1 : document.getElementById("ipBox1"),
    ipBox2 : document.getElementById("ipBox2"),
    ipBox3 : document.getElementById("ipBox3"),
    ipBox4 : document.getElementById("ipBox4"),
    masBox : document.getElementById("masBox"),


    
    ip: `${ipBox1.value}.${ipBox2.value}.${ipBox3.value}.${ipBox4.value}/${masBox.value}`,

    getValues(){
        return {
            ip: Form.ip
            
        }
    },

    validateFields(){
        //verificar se todas as informações foram preenchidas
        const {ip} = Form.getValues()

        //metodo todo para limpar os espaços em branco
        if(ip.trim() === ""){
            throw new Error("Por favor, preencha todos os campos")
        }

        
    },

    formatIpNumber(){
        let {ip} = Form.getValues()

        let ipArra = Formatar.separarIpDeMascara(ip).arrayIp

        Formatar.convertArrayStringPNumber(ipArra)
        
        return ipArra

        
    },


    formatIpString(){
        let {ip} = Form.getValues()

        let ipStin = Formatar.separarIpDeMascara(ip).ipString

        
        return ipStin

        
    },


    formatMascara(){
        let {ip} = Form.getValues()

        let masca = Formatar.separarIpDeMascara(ip).mascarA
        
        return masca
        
    },


    submit(event){
        event.preventDefault()
        //console.log(event)
        
        try {
            //verificar se todas as informações foram preenchidas
            Form.validateFields()
            //formatar os dados para salvar
            //const transaction =  Form.formatValues()
            //salvar Atualizar a aplicação
            //Form.saveTransaction(transaction)
            //apagar os dados do formulario
            //Form.clearFilds()
            //modal feche
            //Modal.open()
        } catch (error){
            alert(error.message)
        }    
    }

}

let butto = document.querySelector("#calc")
butto.addEventListener("click", startt)





const Formatar = {



    separarIpDeMascara(ip){

        
        // o .split() separa o elemento passado conforme o argumento passo como parametro ex (/) 
        const ip_mascara = ip.split("/")//separando o ip da mascara
        //console.log(ip_mascara)
        const ipString = ip_mascara[0]
        const arrayIp = ipString.split(".")
        //console.log(arrayIp)
        const mascarA = Number(ip_mascara[1])
        //console.log(mascarA)
        return {
            ipString,
            arrayIp,
            mascarA
        }
        //console.log(splittedDate)
        

    },

    /*convertArrayBin(array){
    
        let numeros = []
        array.forEach(num => {
    
            numeros.push(Number(dec2bin(num)))
            
        });
    
        return numeros
    },*/

    convertArrayStringPNumber(array) {
        let cont = 0
        array.forEach((element)=>{
            let aux = Number(element)
            array[cont] = aux
            cont++
        })
        
    },

    convertArrayNumeroParaString(array) {
        let cont = 1
        let rest = ""
        array.forEach((element)=>{
            let aux = String(element)
            rest += + aux
            if(cont <= 3){
                rest += "."
                cont++
            }
            
        })
    
        return rest
        
    }
    
}

const Functs = {
    
    hostss(mascaras) {
        //calcula o numero de hosts da rede
        const mascara = mascaras
        //console.log(mascara)
        const totalBits = 32 
        let hosts = totalBits - mascara
        let res = 2 ** hosts - 2
        return res
    },
    
    descobrirMascaraDeSub_Rede(mascaraDaRede) {
        let mascara = mascaraDaRede
        let conj8Bits = Math.floor(mascara / 8) // descobre quantos conjuntos de 8 bits foram usados
        let bitsUsados = mascara % 8 //descobre qual octeto que foi usado parcialmente, mas ainda resta bits que nao foi usados para depois fazer a soma desses bits usados
        let cont = 4 - conj8Bits//descobre quantos octetos do array que nao possui nem um bits usado para depois preencer eles com 0, pois os bits não foram usados
        let arryMascara =[] // array que vai sendo preencida com os valores descobertos
        //console.log(conj8Bits)
        //console.log(bitsUsados)
        //calculo para saber quantos bits nao foram usados
        //let conta= 32 - ((conj8Bits * 8 ) + bitsUsados )
        //console.log(conta)
        let i = conj8Bits
        let i2 = bitsUsados
        let somaDosBits = 128
        let somaTotalDosBtisUsados = 0
        if (conj8Bits >=1) {
            // caso tenha conjuntos de 8bits ja completos
            // então já é colocado altomaticamente o valor de 255 no array de mascara
            while (i > 0) {
                arryMascara.push(255)
                i-- //decrementa o contador do laço
            }

        
        }

        while (i2 > 0) {
            //caso tenha conjuntos de btis usados, mas que nao completa 8bits
            //entao aqui é feita a soma desses bits.
            somaTotalDosBtisUsados += somaDosBits // acumulando a soma total 
            somaDosBits /= 2 // recebendo o valor dele mesmo dividido por 2 a cada loop
            i2-- //decrementa o contador do laço
            if (i2 == 0) {
                //quando chegar no fim da soma do ultimo bit a soma total é acresentada no array da mascara
                arryMascara.push(somaTotalDosBtisUsados)
                cont--
            }
            
            
        }

        while (cont > 0) {
            //quando houver conjutos que nao foi usado nem um bit, entao é preenchido a casa do array com 0
            arryMascara.push(0)
            cont--

        }

        
        /*Pegando os elementos do array de mascara e transformando esses ementos em uma string
        mascaraString = `${String(arryMascara[0])}` + "." + `${String(arryMascara[1])}` + "." + `${String(arryMascara[2])}` + "."+ `${String(arryMascara[3])}` + "/" + `${mascara}`
        */
        return arryMascara


    },


    DecRedeInicialEBroadcast(ip, mascara, mas) {
        /**se os conjutos de octetos da mascara for == 255 quer dizer que todos os bits foram usados
         * E se os conjutos de octetos da mascara for == 0 quer dizer que os 8bits estão livre
         * E se tiver algum octeto que nao estiver sendo completamente usado e for != 0, devo pegar o numero de btis que ñ são usados e devo fazer o alculo de desse valor descoberto de 2** à esse valor encontrado para então ter o numero de host.
         
        */  
        
       let bitsNotUser = (32 - mas)%8 //descobrindo os bits que ñ foram usados de uma mascara que foi usada pascialmente, mas e restou bis livre
       let hostRede = 2**bitsNotUser // descobrindo total de de hots possivel na rede
       let numbSubRede = 256 / (2**bitsNotUser) // descobrindo numeros de sub-rede

        let broadcast = []
        let redeInicial = []
        let aux = 0
        let aux2 = 0
        let res =[]
    
        
        for (let index = 0; index < ip.length; index++) {
            if (mascara[index] === 255 ){ // 
                redeInicial.push(ip[index])
                broadcast.push(ip[index])
            }else if (mascara[index] === 0) {
                redeInicial.push(0)
                broadcast.push(255)
            }else{ 
                if ( ip[index] > hostRede) { //para saber em qual sub rede esse ip se encontra, pois se a rede tem valor maior que o numero de hots possiveis, então deve-se se fazer o calculo p/ saber a sua sub-rede desse ip e o inicio dessa sub-rede
                    console.log(ip[index])
                    aux = ip[index] //recebe o decimal referente ao ip
                    console.log(aux)
                    // ... pegando a divisão indeira da rede ip dividida pela quantidade de host possivel que dará a como resultado a aqual sub-rede que o ip pertence 
                    // depois pega a parte inteira dessa divisão e multiplica pelo valor de host possivel na rede para descobrir o inicio dessa rede
                    aux2 = Math.floor((aux / hostRede)) * hostRede
                    redeInicial.push(aux2)
                    broadcast.push(aux2 + hostRede - 1 )
                }else{
                    broadcast.push(aux2 + hostRede - 1 )
                    redeInicial.push(0)
                    
                }
            }
    
        }
        res =[redeInicial, broadcast]
        return  res
    }
    

}





function startt() {

    console.log(Form.getValues())
    /*var ipBox1 = Number(document.getElementById("ipBox1").value)
    var ipBox2 = Number(document.getElementById("ipBox2").value)
    var ipBox3 = Number(document.getElementById("ipBox3").value)
    var ipBox4 = Number(document.getElementById("ipBox4").value)
    var masBox = Number(document.getElementById("masBox").value)*/

    //console.log(ipBox1, ipBox2, ipBox3, ipBox4, masBox)
    const mas = Form.formatMascara()
    const arrayIp = Form.formatIpNumber()
    const arrymascara = Functs.descobrirMascaraDeSub_Rede(Form.formatMascara())

    let redeInicialEFinal= Functs.DecRedeInicialEBroadcast(arrayIp, arrymascara,mas)

    let redeInicialString = redeInicialEFinal[0]
    let broadcastString = redeInicialEFinal[1]

    //console.log(Form.formatIpString())
    //console.log(Form.formatIpNumber())
    //console.log(Form.formatMascara())

    //console.log(arrayIp)
    //console.log(arrymascara)

    //console.log(redeInicialString)
    //console.log(broadcastString)
    //console.log(mas)
    //console.log(bitsNotUser)

    

    let marcara = document.getElementById("mascara")
    marcara.innerText = `${String(arrymascara[0])}` + "." + `${String(arrymascara[1])}` + "." + `${String(arrymascara[2])}` + "."+ `${String(arrymascara[3])}` + "/" + `${mas}`

    let ipValidos = document.getElementById("nums-ip-validos")
    ipValidos.innerText = `${Functs.hostss(Form.formatMascara()) }`

    let redeInic = document.getElementById("rede-inic")
    redeInic.innerText = `${Formatar.convertArrayNumeroParaString(redeInicialString)}`

    let broadcast = document.getElementById("broadcast")
    broadcast.innerText = `${Formatar.convertArrayNumeroParaString(broadcastString)}`

}
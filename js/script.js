const Get = {

    
    catchIP() {

        var ipBox1 = document.getElementById("ipBox1")
        var ipBox2 = document.getElementById("ipBox2")
        var ipBox3 = document.getElementById("ipBox3")
        var ipBox4 = document.getElementById("ipBox4")
        
        let IP = [[Number(ipBox1.value)], [Number(ipBox2.value)], [Number(ipBox3.value)], [Number(ipBox4.value)]]
        
        return IP
    },

    catchMascara() {

        var masBox = document.querySelector("#masBox")
        
        let MASCARA = Number(masBox.value)
        
        return MASCARA
    }
    
}



const Form = {

    submit(event){
        event.preventDefault()
        console.log(event)
        
        try {
            //verificar se todas as informações foram preenchidas
            //formatar os dados para salvar
            //apagar os dados do formulario
            //modal feche
        } catch (error){
            alert(error.message)
        }    
    }

}

let butto = document.querySelector("#calc")
butto.addEventListener("click", startt)





const Formatar = {



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
        let cont = 4 - conj8Bits//descobre quantos octetos do array que nao possui nem um bits usado para depois preencher eles com 0, pois os bits não foram usados
        let arryMascara =[] // array que vai sendo preenchida com os valores descobertos
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

    let mascaraDeSubRede = Functs.descobrirMascaraDeSub_Rede(Get.catchMascara())

    let mascara = document.getElementById("mascara")
    mascara.innerText = `${String(mascaraDeSubRede[0])}` + "." + `${String(mascaraDeSubRede[1])}` + "." + `${String(mascaraDeSubRede[2])}` + "."+ `${String(mascaraDeSubRede[3])}` + "/" + `${Get.catchMascara()}`

    let ipValidos = document.getElementById("nums-ip-validos")
    ipValidos.innerText = `${Functs.hostss(Get.catchMascara()) }`

    let redeInicial_redeFinal= Functs.DecRedeInicialEBroadcast(Get.catchIP(), Functs.descobrirMascaraDeSub_Rede(Get.catchMascara()),Get.catchMascara())

    let redeInicial = redeInicial_redeFinal[0]
    let redebroadcast = redeInicial_redeFinal[1]

    let redeInic = document.getElementById("rede-inic")
    redeInic.innerText = `${Formatar.convertArrayNumeroParaString(redeInicial)}`

    let broadcast = document.getElementById("broadcast")
    broadcast.innerText = `${Formatar.convertArrayNumeroParaString(redebroadcast)}`
}


"use strict";
/*Importando las constantes */
import {ORDERS} from "./orders";
import {MERCHANTS} from "./merchants";

//función que funciona para todos los id
function comerciantes(){
    console.log("SIN ARGUMENTOS");
    let ids=new Set();
    let out=[];
    for(let i=0;i<ORDERS.length;i++){
        if(ids.has(ORDERS[i].merchant_id)){ //si ya se contemplo el merchand_id ya esta en el hashset
            continue;
        }
        else{    //si no existe el id en el hashset se obtiene el objeto y se agrega a la lista out
            ids.add(ORDERS[i].merchant_id);  
            out.push(comerciante(Number(ORDERS[i].merchant_id)));
        }
    }
    return out;
}

/*función que funciona para un solo id */
function comerciante(m_id=-1){
let transaccionesCompletadas=0;
let montoTotal=0;
let transacciones=0;
let com=0;
let shoppers=new Map();
for(let i=0;i<ORDERS.length;i++){
        if(Number(ORDERS[i].merchant_id)===m_id){
            transacciones++;
            if(ORDERS[i].completed_at.length!==0){
                let aux=Number(ORDERS[i].amount);
                transaccionesCompletadas++;
                montoTotal=montoTotal+aux;
                //calculando la comisión
                if(aux<25000){
                    com=com+aux/100;
                }
                else if(aux<60000){
                    com=com+(aux*0.95)/100;
                }
                else if(aux>60000){
                    com=com+(aux*0.85)/100;
                }
            }
            //para obtener el mejor comprador
            if(shoppers.has(ORDERS[i].shopper_id)){
                let val=shoppers.get(ORDERS[i].shopper_id);
                shoppers.delete(ORDERS[i].shopper_id);
                val++;
                shoppers.set(ORDERS[i].shopper_id,val);
            }
            else{
                shoppers.set(ORDERS[i].shopper_id,1);
            }
        }
    }
    //obteniendo el máximo entre el número de compras de entre todos los compradores
    let maximo=0;
    let llaveMaximo;
    shoppers.forEach(function(value,key){
        if(maximo<value){
            maximo=value;
            llaveMaximo=key;
        }
    });
    //obteniendo el nombre de el merchand
    let nombre="";
    for(let i=0;i<MERCHANTS.length;i++){
        if(Number(MERCHANTS[i].id)===m_id){
            nombre=MERCHANTS[i].name;
        }
    }
    //contruyendo el objeto de salida
    return {
        //id: 1,  No tiene sentido hablar de un id de un solo elemento
        merchant_id: m_id,
        merchant:nombre,
        numero_ventas: transaccionesCompletadas,
        faltan_completar: transacciones-transaccionesCompletadas,
        total_ventas: montoTotal,
        comision: com,
        desembolso: montoTotal-com,
        mejor_comprador:llaveMaximo
    };

}
console.log(comerciantes());
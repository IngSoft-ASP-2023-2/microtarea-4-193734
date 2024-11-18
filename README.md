[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/LmyA7_0U)
# microtarea-4-aws-lambda

## LINK AL VIDEO
Link: https://youtu.be/IqLOs_N3Cm0

## Notas del alumno:
- Se utilizo como base dynamodb debido a la facilidad para poder acceder a la misma desde una funcion lambda.
- Se arranca con un evento creado como ya se establecia que los eventos ya estaban registrados en la base en la letra.
- El evento claramente cuentra con un nombre no ideal ya que por cuestiones de tiempo no se llego a emprolijar que se corte la extension del nombre de la imagen, ademas de buscar otro ejemplo mas prolijo.
- Se deja a disposicion el codigo de cada funcion, ademas del zip que se subio como layer para la segunda funcion y el codigo contenido en la misma (validations.js el cual para que funcione correctamente en la layer debe ponerse dentro de ciertas carpetas). funcion1.js corresponde a la que se ejecuta cuando se inserta una imagen en el bucket, mientras que funcion2.js corresponde a la de la parte 2.

## Letra

Ud está construyendo una app para la venta de tickets a eventos deportivos y espectáculos musicales (una ticketera), en ese sentido quiere comenzar con un MVP que le genere el menor gasto posible.

Para ello, debe implementar 2 funciones lambda en aws.
1. La primera, escucha la inserción de un objeto en un bucket que son los flyers (imágenes) de los eventos y los inserta en una base de datos RDS (asumir que el evento ya existe y el nombre del archivo es el nombre del mismo).
2. La segunda, es accesible vía api gateway (método POST) que gestiona la venta de un espectáculo. Para ello, con una capa debe verificar la validez de la tarjeta de crédito de entrada (visa y master) y disminuir la cantidad de entradas disponibles. Además, para evitar el caso borde de ejecuciones no deseadas, en dynamo se debe implementar el conditional writing - que chequea si la instancia de la función lambda ya fue ejecutada.

## Notas
La BD solo cuenta con una tabla: Nombre evento, costo entrada, entradas disponibles, flyer (img mapeada a un string).

let autos = require('./autos');

let autosImportados = autos;


const concesionaria = {
   autos: autosImportados,

   // Busca un auto por patente y retorna el auto o null si no lo encuentra
   buscarAuto: function(patente){
      let autoEncontrado = this.autos.find(function(auto){
         return auto.patente === patente;
      });
      return autoEncontrado || null;
   },

   // Vende un auto cambiando el estado a vendido si encuentra la patente
   venderAuto: function(patente){
      let auto = this.buscarAuto(patente);
      if (auto){
         auto.vendido = true;
      }
   },

   // Retorna la lista de autos para la venta (no vendidos)
   autosParaLaVenta: function(){
      return this.autos.filter(function(auto){
         return !auto.vendido;
      });
   },

   // Retorna la lista de autos 0 km (kilometraje menor a 100)
   autosNuevos: function(){
      let autosParaLaVenta = this.autosParaLaVenta();

      return autosParaLaVenta.filter(function(auto) {
        return auto.km < 100;
      });
   },

   // Retorna una lista con los precios de venta de los autos vendidos
   listaDeVentas: function(){
      let autosVendidos = this.autos.filter(function(auto){
         return auto.vendido;
      });

      let preciosDeVentas = autosVendidos.map(function(auto){
         return auto.precio;
      });

      return preciosDeVentas;
   },

   // Retorna el total de ventas sumando los precios de venta de los autos vendidos
   totalDeVentas: function(){
      let preciosDeVentas = this.listaDeVentas();

      let total = preciosDeVentas.reduce(function(acumulador,precio){
         return acumulador + precio;
      }, 0);
      return total;
   },

   // Verifica si una persona puede comprar un auto según sus capacidades de pago
   puedeComprar: function(auto, persona) {
      let costoTotalAuto = auto.precio * auto.cuotas;
      if (costoTotalAuto > persona.capacidadDePagoTotal) {
         return false;
      }
      if (persona.capacidadDePagoEnCuotas < auto.precio / auto.cuotas) {
         return false;
      }
      return true;
   },

   // Retorna la lista de autos que una persona puede comprar
   autosQuePuedeComprar: function(persona) {
      let autosParaLaVenta = this.autosParaLaVenta();

      let autosQuePuedeComprar = autosParaLaVenta.filter(function(auto) {
         return this.puedeComprar(auto, persona); 
      }, this);

      return autosQuePuedeComprar;
   },
};

// Ejemplo de uso de autosQuePuedeComprar
let personaEjemplo = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
};

console.log("Autos que Juan puede comprar:");
console.log(concesionaria.autosQuePuedeComprar(personaEjemplo));

// Exporta el objeto concesionaria
module.exports = concesionaria;

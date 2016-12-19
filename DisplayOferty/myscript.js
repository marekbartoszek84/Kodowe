$(document).ready(function(){
  function Oferta(name, zawod) {
    var self = this;
    self.name = name;
    self.zawod = ko.observable(zawod);
}
  function viewModel() {

     this.dayOfWeek = ko.observable('Sunday');
     this.oferts=ko.observableArray([
     	new Oferta("Sprzataczka", "spra"),
     	new Oferta("Kelner", "draaa")
     	]);
  		
  };

  ko.applyBindings(new viewModel()); 

   $("h2").click(function(){
   		console.log("click");
   });

}); 
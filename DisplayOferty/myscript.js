$(document).ready(function(){
  function Oferta(name, zawod) {
    var self = this;
    self.name = name;
    self.zawod = zawod;
}
  function viewModel() {

     this.dayOfWeek = ko.observable('Sunday');
     this.oferts=ko.observableArray([
     	]);

       let ogloszenia=[];
       $.ajax({
        type:"GET",
         url:'data.xml',
         async: true,
        dataType: 'xml',
        success: function(response){
          let MainXml=$(response).find('payload').text();
          let xmlDoc=$.parseXML(MainXml);
          let MainOferts =$(xmlDoc).find('PositionOpening').find('PositionProfile').each(function(){
            let id=$(this).find('PositionNumberPL').text();
            let zawod=$(this).find('ProfileName').text();
             let oferta = new Oferta(id, zawod);
             ogloszenia.push(oferta);
             console.log(oferta);
          });
          console.log("xml loaded successfull");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log("error! Loading xml faild");
        }
     });
      console.log("oferta: ")
  		
  };


  ko.applyBindings(new viewModel()); 


}); 
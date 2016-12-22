$(document).ready(function(){
  function Oferta(name,number, zawod,placa) {
    var self = this;
    self.name=name;
    self.number = number;
    self.zawod = zawod;
    self.placa=placa;
}

  function viewModel() {
      let self=this;
     this.dayOfWeek = ko.observable('Sunday');
     this.oferts=[];
     self.counter=ko.observable(0);
let refreschCounter=setInterval(function(){
  self.incrementCounter();
 // $(".oferta").css("display", "none")
 if (self.counter()>0){
     $(".s_"+(self.counter()-1)).addClass("hideOfert");
     console.log("hide previous ofert");
}
else{
  console.log("hiding oferts number:" + self.oferts.length/3);
  $(".s_"+(Math.floor(self.oferts.length/3))).addClass("hideOfert");
  }

  $(".s_"+self.counter()).toggleClass("hideOfert");
},3000);

       $.ajax({
        type:"GET",
         url:'data.xml',
         async: false,
        dataType: 'xml',
        success: function(response){
          let MainXml=$(response).find('payload').text();
          let xmlDoc=$.parseXML(MainXml);
          let MainOferts =$(xmlDoc).find('PositionOpening').find('PositionProfile').each(function(){
            let name=$(this).find('ProfileName').text();
            let id=$(this).find('PositionNumberPL').text();
            let zawod=$(this).find('PositionTitle').text();
            let placa=$(this).find('BasePayAmountMin').text();
             let oferta = new Oferta(name, id, zawod, placa);
             self.oferts.push(oferta);
             console.log(oferta+" "+self.counter());
          });

          console.log("xml loaded successfull");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log("error! Loading xml faild");
        }
     });
      console.log("oferta: ")
  		self.incrementCounter= function () {
            var previousCount = self.counter();
            if(previousCount+1>=self.oferts.length/3){
              self.counter(0);
            }
            else
            self.counter(previousCount + 1);
        };

        self.visibleStatus=ko.pureComputed(function(number){
          return self.counter() < number? "hideOfert" : "as";
        });

        
  };


  ko.applyBindings(new viewModel()); 


}); 
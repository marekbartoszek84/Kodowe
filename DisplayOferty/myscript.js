function addZeroToTimeNumber(timeStamp){
  if(timeStamp<10)
    return "0"+timeStamp;
  else
    return timeStamp;
}
function getWeakDay(dayNumber){
  let dayNames=[ "niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  return dayNames[dayNumber];
}

function checkPerHoursRent(payment){
  if(payment<100.00)
    return payment+"zł za godzinę";
  return payment+"zł";
}

function createAddress(code, city,street, number){
  let postCode=code.substring(0,2)+"-"+code.substring(2,5);
  return city+" "+street+" "+number+", "+postCode;
}

function City(code, name){
  this.code=code;
  this.name=name;
}

function compareCityAndStreet(city,street)
{
  if(city.localeCompare(street)==0)
    return "";
  else
    return "ul. "+street;
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = new City(data[0], data[1]);
            //for (var j=0; j<headers.length; j++) {
                //tarr.push(data[0]+":"+data[1]);
            //}
            lines.push(tarr);
        }
    }
    //console.log("Load success.."+lines);
    return lines;
    }



$(document).ready(function(){
  function Oferta(name,number,zamknieta, zawod,obowiazki, pracodawca, placa, adres, telefon, email,wymagania) {
    var self = this;
    self.name=name;
    self.number = number;
    self.zamknieta=zamknieta;
    self.zawod = zawod;
    self.obowiazki = obowiazki;
    self.pracodawca= pracodawca;
    self.placa= placa;
    self.adres=adres;
    self.telefon=telefon;
    self.email=email;
    self.wymagania=wymagania;
}

  function viewModel() {
      let self=this;
     this.dayOfWeek = ko.observable('Sunday');
     this.oferts=[];
     self.Cities=[];
     self.counter=ko.observable(0);
     self.pagesNumber=ko.observable(0);

      $.ajax({
        type: "GET",
        url: "miejscowosci.csv",
        dataType: "text",
        async:false,
        success: function(data) {
          self.Cities=processData(data);
        }
     });



     let refreshClocker=setInterval(function(){
        let time=new Date();
        $(".hours").html(addZeroToTimeNumber(time.getHours())+":"); 

        $(".minutes").html(addZeroToTimeNumber(time.getMinutes())+":");

        $(".seconds").html(addZeroToTimeNumber(time.getSeconds()));

        $(".day").html(getWeakDay(time.getDay())+' '+addZeroToTimeNumber(time.getDate())+"-"+addZeroToTimeNumber(time.getMonth()+1)+"-"+time.getFullYear());
        

     },000);
      self.getCity =function(number){
        var result = $.grep(self.Cities, function(e){ return e.code == parseInt(number); });
        if(result.length>0){
          return result[0].name;
        }
        else {
          return "";
        }
      };
     let refreschCounter=setInterval(function(){
       self.incrementCounter();
      /* if (self.counter()>0){
          $(".s_"+(self.counter()-1)).addClass("hideOfert");
          console.log("hide previous ofert");
        }
       else{
          console.log("hiding oferts number:" + self.oferts.length/3);
          $(".s_"+(Math.floor(self.oferts.length/3))).addClass("hideOfert");
        }

        $(".s_"+self.counter()).toggleClass("hideOfert");*/
      },8000);

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
            let zamknieta=$(this).find('CzyZamknieta').text();

            let zawod=$(this).find('PositionTitle').text();
            let obowiazki=$(this).find('ObligationRange_PL').text();
            let pracodawca=$(this).find('OrganizationName').text();
            let placa=checkPerHoursRent($(this).find('BasePayAmountMin').text());
            let tempAddress=$(this).find('ContactMethod').find('PostalAddress');

            let cityNumber =tempAddress.find('Municipality').text();
            let cityName=self.getCity(cityNumber);
            let cityStreet=compareCityAndStreet(cityName, tempAddress.find('StreetName').text());

            let adres=createAddress(tempAddress.find('PostalCode').text(),
                      cityName, cityStreet, tempAddress.find('BuildingNumber').text());



            let telefon=$(this).find('ContactName').find('FormattedNumber').text();
            let email=$(this).find('InternetEmailAddress').text();
            let wymagania=[];
            $(this).find('SkillDescription').each(function(){
                wymagania.push($(this).text());
            });

           // let wymagania=$(this).find('SkillDescription').text();
            let oferta = new Oferta(name, id, zamknieta, zawod, obowiazki,  pracodawca, placa, adres, telefon, email, wymagania);
             self.oferts.push(oferta);
             self.pagesNumber=Math.floor(self.oferts.length/3)+1;
             
          });

          console.log("xml loaded successfull ");
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
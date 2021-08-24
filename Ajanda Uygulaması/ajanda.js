// document.querySelector(".gorev-form").addEventListener("submit", GorevEkle)
const yeniGorev = document.querySelector(".input-gorev")
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle")
const gorevListesi = document.querySelector(".gorev-listesi")
document.addEventListener("DOMContentLoaded", LocalStorageOku);

yeniGorevEkleBtn.addEventListener("click", GorevEkle);

function GorevEkle(e) {
    e.preventDefault();

    if (yeniGorev.value.length > 0) {

        gorevItemOlustur(yeniGorev.value);

        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = "";   // GÖREV EKLENDİKTEN SONRA INPUT ALANINI BOŞALT.    

    } else {
        alert("Alan boş olduğu için ajandaya ekleme yapılamadı!");
    }

}

function LocalStorageArrayeDonustur() {
    let gorevler;
    if (localStorage.getItem("gorevler") === null) {
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    return gorevler;
}
function localStorageKaydet(yeniGorev) {
    let gorevler = LocalStorageArrayeDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function LocalStorageOku() {
    let gorevler;

    gorevler = LocalStorageArrayeDonustur();

    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev) {
    // DIV OLUŞTURMA
    const gorevDiv = document.createElement("div")
    gorevDiv.classList.add("gorev-item");

    // Lİ OLUŞTURMA
    const gorevLi = document.createElement("li")
    gorevLi.classList.add("gorev-tanim")
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    // UL'YE OLUŞTURULAN DIV'İ  EKLEYELİM:
    gorevListesi.appendChild(gorevDiv);

    // TAMAMLANDI BUTONU EKLEYELİM:
    const gorevTamamBtn = document.createElement("button")
    gorevTamamBtn.classList.add("gorev-btn")  // ÖNCE GENEL CLASS ADINI EKLERİZ.
    gorevTamamBtn.classList.add("gorev-btn-tamamlandi") // SONRA ÖZEL CLASS ADINI EKLERİZ.
    gorevTamamBtn.innerHTML = '<i class="far fa-calendar-check"></i>'
    gorevDiv.appendChild(gorevTamamBtn);

    // SİL BUTONU EKLEYELİM:
    const gorevSilBtn = document.createElement("button")
    gorevSilBtn.classList.add("gorev-btn");
    gorevSilBtn.classList.add("gorev-btn-sil");
    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
    gorevDiv.appendChild(gorevSilBtn);



    gorevListesi.appendChild(gorevDiv); // OLUŞTURDUĞUMUZ DIV'İ "ul"YE EKLEYELİM.
}

gorevListesi.addEventListener("click", gorevSilTamamla)

function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;


    if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
        console.log("check");
        tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi")
        // BUTONA TIKLADIKTAN SONRA DIV ALANININ TAMAMINI OPAKLAŞTIRIP VE ÜZERİNİ ÇİZMESİ İÇİN "parentElement" İLE
        // DIV ALANINA ULAŞTIK. ARDINDAN classList.toggle() METODUYLA DIV ALANININ CLASS'INI "gorev-tamamlandi"
        // OLARAK DEĞİŞTİRDİK.
    }

    if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {

        if(confirm("Silme işlemini onaylıyor musunuz?")){

            tiklanilanEleman.parentElement.classList.toggle("kaybol")
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            LocalStorageSil(silinecekGorev);
            tiklanilanEleman.parentElement.remove();
        }
    }
}

function LocalStorageSil(gorev) {
    let gorevler;

    gorevler = LocalStorageArrayeDonustur();

    const silinecekElemanIndex = gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanIndex, 1);

    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
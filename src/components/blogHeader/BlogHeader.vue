<template>
  <div class="topHeaderBlog">
    <div class="col-8 wrapper">
        <div class="flexRow card" id="card">  
            <div id="asd" class="card makeColumn">
                <h3 id="headline">{{$t("blogsite.header.headline")}}</h3>
                <p class="textHeader"> <i>{{$t("blogsite.header.subheader1")}}</i></p>
                <p class="cardText">{{$t("blogsite.header.subheader1content")}}</p>
                <p class="textHeader"> <i>{{$t("blogsite.header.subheader2")}}</i></p>
                <p class="cardText">{{$t("blogsite.header.subheader2content")}}</p>
                <p class="textHeader"> <i>{{$t("blogsite.header.subheader3")}}</i></p>
                <p class="cardText">{{$t("blogsite.header.subheader3content")}}</p>
            </div>
        </div>
    </div>
    <div class="col-4 wrapper" id="logo">
        <img src="https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/webProfileIMG.jpg" alt="Cats profile image">
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .topHeaderBlog{
        background-color: #67595E;
        display: flex;
        justify-content: flex-end;
    }
    .topHeaderBlog .wrapper{
        display: flex;
    }
    .flexRow{
        display: flex;
        justify-content: space-evenly;
        padding: 1%;
        padding-top: 0;
        padding-bottom: 0;
    }
    .card{
        display: flex;
        /*flex-direction: column;*/
    }
    .makeColumn{
        flex-direction: column;
    }

    .textHeader{
        font-size: 1.7rem;
        color:#A49393;
    }
    .cardText{
        margin-top: 0;
        margin-bottom: 0; 
        margin-left: 2em;
        color: #EED6D3;
    }

    .col-4 {width: 33.33%;}
    .col-8 {width: 66.66%;}
    #logo img{
        width: 100%;
        max-height: 500px;
        object-fit: cover;
        filter: sepia(0.2), hue-rotate(1);
    }

    #logo{
        background-color: #E8B4B8;
        justify-content: flex-end;
    }
    #headline{
        margin-top: 0; 
        margin-bottom: 0;
        padding: 5px;
        font-size: 3rem; 
        color: #E8B4B8;
        letter-spacing: 5px;
    }

    @media only screen and (max-width: 1400px) {
    .topHeaderBlog{
        flex-direction: column-reverse;
        align-items: center;
    }

    .topHeaderBlog div{
        margin-bottom: 1rem;
        width: 80%;
        justify-content: space-around;
    }
    #logo img{
        max-height: 400px;
        object-fit: contain;
        background-color: #67595E;
    } 
}

@media only screen and (max-width: 1300px) {
    .topHeaderBlog div{
        margin-right: 2rem;
    }
      #logo img{
        max-height: 350px;
        object-fit: contain;
    } 
}

@media only screen and (max-width: 1050px) {
    .topHeaderBlog{
        background-image: none;
        animation: none;
        padding-bottom: 2rem;
        padding-top: 2rem;
    }

    .topHeaderBlog div {
        margin: auto;
       width: 100%; 
    }

    .topHeaderBlog div h3 {
        margin-top: 0;
        margin-bottom: 0;
    }
    .topHeaderBlog div h1 {
        margin-top: 0;
        margin-bottom: 0;
    }

    #card{
        flex-direction: row;
    }
}

@media only screen and (max-width: 850px) {
    #card{
        width: 90%;
        flex: none;
        padding: 0;
    }

    #asd{
        margin: 0;
        padding: 0;
    }

    .makeColumn{
        width: 100%;
    }
}

</style>
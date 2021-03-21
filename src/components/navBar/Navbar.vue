<template>
    <div class="navSection">
        <div v-on:click="showNHide" id="hamburgerDiv">
            <i class="fas fa-bars"></i>
        </div>
        <div name="menuitem" class="col-4" id="navLanguageSel">
            <button class="langBtn" type="submit" @click="$i18n.locale = 'fi'">
                <img
                    value="fi"
                    class="langSelect"
                    src="https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/finland.png"
                    alt="Suomeksi"
                    srcset=""
                />
            </button>
            <button class="langBtn" type="submit" @click="$i18n.locale = 'en'">
                <img
                    value="en"
                    class="langSelect"
                    src="https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/united-kingdom.png"
                    alt="In english"
                    srcset=""
                />
            </button>
        </div>
        <div class="col-4" id="catNav">
            <img
                id="logoImage"
                src="https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/webProfileIMG.jpg"
                alt="Blogger's image as logo"
            />
        </div>
        <div name="menuitem" class="col-4" id="navLinks">
            <router-link class="link" to="/"
                >{{ $t("pages.home") }}
                <i class="fas fa-check-circle helper"></i
            ></router-link>
            <router-link class="link" to="/blog"
                >{{ $t("pages.blog") }}
                <i class="fas fa-check-circle helper"></i
            ></router-link>
            <router-link class="link" to="/contact"
                >{{ $t("pages.contact") }}
                <i class="fas fa-check-circle helper"></i
            ></router-link>
            <router-link class="link" to="/appz"
                >{{ $t("pages.appz") }}
                <i class="fas fa-check-circle helper"></i
            ></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        showNHide: () => {
            const menuItems = document.getElementsByName("menuitem");
            menuItems.forEach((item) => {
                if (item.style.display == "") {
                    item.style.display = "flex";
                    item.classList.remove("hideMenuAnimation");
                    item.classList.add("showMenuAnimation");
                } else if (item.style.display == "flex") {
                    item.classList.add("hideMenuAnimation");
                    item.classList.remove("showMenuAnimation");
                    setTimeout(() => {
                        item.style.display = "";
                    }, 1000);
                }
            });
        },
    },
};
</script>

<style scoped>
/*Colors
    --backgroundColor: #EED6D3;
    --highLigthColor: #E8B4B8;
    --helperColor: #A49393;
    --strongColor: #67595E;
*/

.helper {
    display: none;
}
.router-link-exact-active .helper {
    display: inline-block;
}

.router-link-exact-active {
    background-color: #e8b4b8;
    font-weight: bold;
}

.langBtn {
    background: none;
    border: none;
    outline: none;
}
.langBtn::selection {
    background: none;
    border: none;
}
.langBtn :hover {
    cursor: pointer;
    animation: highLightLanguage forwards;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
}

@keyframes highLightLanguage {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.2);
    }
}

* {
    box-sizing: border-box;
}

.hide {
    display: none;
}

.col-4 {
    width: 33.33%;
}

#logoImage {
    height: 75px;
    width: auto;
    border-radius: 50%;
    object-fit: cover;
}

.langSelect {
    width: 2rem;
    margin-left: 1rem;
    /*Remove fowwolwing after translation*/
}

.navSection {
    background-color: #eed6d3;
    padding: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}

.link {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 50%;
    padding-bottom: 50%;
    text-decoration: none;
    color: #67595e;
    font-size: 1.25rem;
    letter-spacing: 2px;
    font-family: "Lato", "sans-serif";
}
.link:hover {
    background-color: #e8b4b8;
    color: #67595e;
    cursor: pointer;
}

.navItemPagePointer {
    font-weight: bold;
    background-color: #e8b4b8;
}

#navLinks {
    text-align: right;
}
#catNav {
    text-align: center;
}

#hamburgerDiv {
    display: none;
}

@media only screen and (max-width: 1250px) {
    #catNav {
        width: 16.66%;
    }

    #navLanguageSel,
    #navLinks {
        width: 41.66%;
    }
}

@media only screen and (max-width: 1050px) {
    .navSection {
        justify-content: center;
    }
}

@media only screen and (max-width: 980px) {
    #navLanguageSel {
        width: 20%;
    }

    #navLinks {
        width: 80%;
    }

    #logoImage {
        display: none;
    }
}

@media only screen and (max-width: 680px) {
    .navSection {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-end;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    #navLinks,
    #navLanguageSel {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #navLanguageSel {
        align-items: flex-end;
    }

    #catNav {
        text-align: center;
        margin: auto;
        width: 100%;
    }

    .langSelect {
        margin-right: 30px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .navSection a {
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 5%;
        padding-bottom: 5%;
        letter-spacing: 2px;
    }

    #hamburgerDiv {
        display: block;
        margin-bottom: 3rem;
        margin-right: 30px;
        margin-top: 2rem;
    }

    #hamburgerDiv i {
        font-size: 3rem;
    }

    #navLanguageSel,
    #navLinks {
        display: none;
    }
}

@keyframes showMenu {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* The element to apply the animation to */
.showMenuAnimation {
    animation-name: showMenu;
    animation-duration: 1s;
    animation-iteration-count: 1;
}

@keyframes hideMenu {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(0);
        opacity: 0;
    }
}

/* The element to apply the animation to */
.hideMenuAnimation {
    animation-name: hideMenu;
    animation-duration: 1s;
    animation-iteration-count: 1;
}
</style>

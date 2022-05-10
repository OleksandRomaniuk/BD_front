const mainMenu = [
    {
        name: "Логін",
        link: "/"
    },
    {
        name: "Реєстрація",
        link: "/register"
    }
]

const userMenu = [
    {
        name: "Всі книги",
        link: "/"
    },
    {
        name: "Мої книги",
        link: "/my"
    }
]

const libraryMenu = [
    {
        name: "Всі книги",
        link: "/"
    },
    {
        name: "Додати книгу",
        link: "/createBook"
    },
    {
        name: "Запити на видачу",
        link: "/requests"
    },
    {
        name: "Примірники на руках",
        link: "/taken"
    },
    {
        name: "Робота з авторами",
        link: "/authors"
    },
    {
        name: "Робота з категоріями",
        link: "/categories"
    },
    {
        name: "Акти",
        link: "/akt"
    }
]

const adminMenu = [
    {
        name: "Список боржників",
        link: "/"
    },
    {
        name: "Додати бібліотекаря",
        link: "/manage"
    }
]

module.exports={mainMenu, userMenu, libraryMenu, adminMenu}
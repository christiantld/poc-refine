export const resources = [

  {
    name: "products",
    list: "/products",
    create: "/products/create",
    edit: "/products/edit/:id",
    show: "/products/show/:id",
    meta: {
      canDelete: true,
      label: "Produtos",
      icon: false
    },
  },
  {
    name: "stores",
    list: "/stores",
    show: "/stores/show/:id",
    meta: {
      canDelete: false,
      label: "Lojas",
      icon: false
    },
  },
  {
    name: "store_users",
    list: "/users",
    show: "/users/show/:id",
    meta: {
      canDelete: false,
      label: "Usuários",
      icon: false
    },
  },
  {
    name: "store_sales",
    list: "/sales",
    show: "/sales/show/:id",
    meta: {
      canDelete: false,
      label: "Vendas",
      icon: false
    },
  }
]
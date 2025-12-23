// ============================================
// VARIABLES GLOBALES
// ============================================

// Datos completos de todos los productos
const productosDetalles = {
    // Hamburguesas
    'ranch-burger': {
        nombre: 'Ranch Burger',
        categoria: 'Clásica',
        precio: 89,
        imagen: '../imagenes/Ranch_Burger.jpg',
        descripcion: 'Una deliciosa hamburguesa estilo ranch con salsa especial y vegetales frescos. La combinación perfecta entre lo clásico y el sabor campestre.',
        ingredientes: [
            'Carne de res 200g',
            'Pan brioche tostado',
            'Salsa ranch casera',
            'Lechuga fresca',
            'Tomate orgánico',
            'Cebolla morada',
            'Queso cheddar',
            'Pepinillos en vinagre'
        ]
    },
    'mediterranean-burger': {
        nombre: 'Mediterranean Burger',
        categoria: 'Gourmet',
        precio: 115,
        imagen: '../imagenes/hamburguesa_mediterranea.avif',
        descripcion: 'Inspirada en los sabores del mediterráneo, con aceitunas, queso feta y hierbas frescas.',
        ingredientes: [
            'Carne de cordero 200g',
            'Pan de masa madre',
            'Queso feta',
            'Aceitunas Kalamata',
            'Tomates secos',
            'Rúcula fresca',
            'Salsa tzatziki',
            'Mezcla de hierbas mediterráneas'
        ]
    },
    'mushroom-burger': {
        nombre: 'Mushroom Swiss',
        categoria: 'Clásica',
        precio: 98,
        imagen: '../imagenes/hamburguesa_con_champiñones.png',
        descripcion: 'Hamburguesa con champiñones salteados en mantequilla de ajo y queso suizo derretido.',
        ingredientes: [
            'Carne de res 200g',
            'Pan de ajo',
            'Champiñones portobello',
            'Queso suizo',
            'Cebolla caramelizada',
            'Rúcula',
            'Salsa especial de hongos',
            'Mantequilla de ajo'
        ]
    },
    'argentinian-burger': {
        nombre: 'Argentinian Burger',
        categoria: 'Especial',
        precio: 110,
        imagen: '../imagenes/hamburguesa_argentina.png',
        descripcion: 'Sabor argentino auténtico con chimichurri fresco y provoleta derretida.',
        ingredientes: [
            'Carne de res 250g (corte argentino)',
            'Pan criollo',
            'Provoleta argentina',
            'Chimichurri casero',
            'Lechuga morada',
            'Tomate asado',
            'Morrones asados',
            'Jamón crudo'
        ]
    },
    'lentil-burger': {
        nombre: 'Lentil Power',
        categoria: 'Vegetariana',
        precio: 85,
        imagen: '../imagenes/hamburguesa_de_lenteja.png',
        descripcion: 'Hamburguesa de lentejas con especias mediterráneas, perfecta para una opción saludable y deliciosa.',
        ingredientes: [
            'Lentejas orgánicas',
            'Zanahoria rallada',
            'Cebolla picada',
            'Ajo fresco',
            'Comino y cilantro',
            'Pan integral',
            'Lechuga',
            'Tomate',
            'Mayonesa de ajo'
        ]
    },
    'buffalo-burger': {
        nombre: 'Buffalo Chicken',
        categoria: 'Especial',
        precio: 104,
        imagen: '../imagenes/hamburguesa_de_buffalo.png',
        descripcion: 'Hamburguesa de pollo con salsa buffalo picante y aderezo ranch cremoso.',
        ingredientes: [
            'Pechuga de pollo empanizada',
            'Pan de ajonjolí',
            'Salsa buffalo picante',
            'Aderezo ranch',
            'Lechuga iceberg',
            'Tomate',
            'Cebolla morada',
            'Pepinillos'
        ]
    },
    'turkey-burger': {
        nombre: 'Turkey Delight',
        categoria: 'Clásica',
        precio: 94,
        imagen: '../imagenes/hamburguesa_de_pavo.png',
        descripcion: 'Hamburguesa de pavo con arándanos y queso de cabra, una opción ligera y sabrosa.',
        ingredientes: [
            'Carne de pavo molida',
            'Pan multigrano',
            'Queso de cabra',
            'Arándanos deshidratados',
            'Espinacas baby',
            'Cebolla caramelizada',
            'Mayonesa de mostaza y miel'
        ]
    },
    'asian-burger': {
        nombre: 'Asian Fusion',
        categoria: 'Especial',
        precio: 112,
        imagen: '../imagenes/hamburguesa_asiatica.jpg',
        descripcion: 'Fusión asiática con jengibre, salsa teriyaki y vegetales orientales.',
        ingredientes: [
            'Carne de cerdo molida',
            'Pan de leche asiático',
            'Salsa teriyaki',
            'Jengibre fresco',
            'Cebollín',
            'Zanahoria en juliana',
            'Brotes de soja',
            'Sésamo tostado'
        ]
    },
    'bison-burger': {
        nombre: 'Bison Burger',
        categoria: 'Gourmet',
        precio: 165,
        imagen: '../imagenes/hamburguesa_bisonte.png',
        descripcion: 'Exclusiva hamburguesa de bisonte con salsa de arándanos silvestres.',
        ingredientes: [
            'Carne de bisonte 250g',
            'Pan rústico de centeno',
            'Salsa de arándanos silvestres',
            'Queso gouda ahumado',
            'Rúcula',
            'Cebolla asada',
            'Tocino crujiente'
        ]
    },
    'mexican-fire': {
        nombre: 'Mexican Fire',
        categoria: 'Especial',
        precio: 107,
        imagen: '../imagenes/hamburguesa_mexicana_picante.png',
        descripcion: '¡Para valientes! Hamburguesa mexicana con jalapeños y salsa habanero.',
        ingredientes: [
            'Carne de res picante',
            'Pan de maíz',
            'Jalapeños en rodajas',
            'Salsa habanero',
            'Guacamole',
            'Queso monterrey jack',
            'Frijoles refritos',
            'Crema mexicana'
        ]
    },
    'chickpea-burger': {
        nombre: 'Chickpea Burger',
        categoria: 'Vegetariana',
        precio: 87,
        imagen: '../imagenes/hamburguesa_de_garbanzo.jpg',
        descripcion: 'Hamburguesa de garbanzos con especias orientales y salsa tahini.',
        ingredientes: [
            'Garbanzos cocidos',
            'Comino y cúrcuma',
            'Pan pita',
            'Salsa tahini',
            'Tomate',
            'Pepino',
            'Cebolla morada',
            'Menta fresca'
        ]
    },
    'blue-cheese-burger': {
        nombre: 'Blue Cheese Burger',
        categoria: 'Gourmet',
        precio: 125,
        imagen: '../imagenes/hamburguesa_con_queso_azul.png',
        descripcion: 'Para amantes del queso azul, con cebolla caramelizada y nueces.',
        ingredientes: [
            'Carne de res premium',
            'Pan de nueces',
            'Queso azul gorgonzola',
            'Cebolla caramelizada',
            'Rúcula',
            'Nueces tostadas',
            'Salsa de oporto'
        ]
    },
    'lamb-burger': {
        nombre: 'Lamb Supreme',
        categoria: 'Gourmet',
        precio: 140,
        imagen: '../imagenes/hamburguesa_de_cordero.png',
        descripcion: 'Hamburguesa de cordero con menta fresca y yogur griego.',
        ingredientes: [
            'Carne de cordero molida',
            'Pan árabe',
            'Yogur griego con menta',
            'Cebolla morada',
            'Tomate',
            'Pepino',
            'Mezcla de especias orientales'
        ]
    },
    'tuna-burger': {
        nombre: 'Tuna Burger',
        categoria: 'Especial',
        precio: 118,
        imagen: '../imagenes/hamburguesa_de_atun.png',
        descripcion: 'Hamburguesa de atún con wasabi y jengibre, estilo japonés.',
        ingredientes: [
            'Atún fresco',
            'Pan de wasabi',
            'Salsa de soja',
            'Jengibre fresco',
            'Aguacate',
            'Brotes de bambú',
            'Sésamo',
            'Algas nori'
        ]
    },
    'italian-burger': {
        nombre: 'Italian Style',
        categoria: 'Clásica',
        precio: 105,
        imagen: '../imagenes/hamburguesa_italiana.png',
        descripcion: 'Sabores italianos con pesto genovés y mozzarella de búfala.',
        ingredientes: [
            'Carne de res',
            'Pan focaccia',
            'Pesto de albahaca',
            'Mozzarella de búfala',
            'Tomate',
            'Rúcula',
            'Jamón prosciutto',
            'Aceite de oliva extra virgen'
        ]
    },
    'soy-burger': {
        nombre: 'Soy Burger',
        categoria: 'Vegetariana',
        precio: 82,
        imagen: '../imagenes/hamburguesa_de_soja.png',
        descripcion: 'Hamburguesa de soja con vegetales asiáticos y salsa agridulce.',
        ingredientes: [
            'Proteína de soja texturizada',
            'Pan integral',
            'Salsa agridulce',
            'Pimiento morrón',
            'Cebolla',
            'Zanahoria',
            'Piña',
            'Anacardos'
        ]
    },
    'texmex-burger': {
        nombre: 'Tex-Mex Burger',
        categoria: 'Especial',
        precio: 113,
        imagen: '../imagenes/hamburguesa_tex_mex.png',
        descripcion: 'Fusión tex-mex con frijoles, nachos y salsa de chili.',
        ingredientes: [
            'Carne de res',
            'Pan de tortilla',
            'Frijoles negros',
            'Nachos triturados',
            'Queso cheddar',
            'Salsa chili',
            'Crema agria',
            'Cilantro fresco'
        ]
    },
    'greek-burger': {
        nombre: 'Greek Burger',
        categoria: 'Especial',
        precio: 109,
        imagen: '../imagenes/hamburguesa_griega.png',
        descripcion: 'Hamburguesa griega con queso feta, aceitunas y orégano.',
        ingredientes: [
            'Carne de cordero',
            'Pan pita',
            'Queso feta',
            'Aceitunas kalamata',
            'Tomate',
            'Pepino',
            'Cebolla roja',
            'Orégano fresco'
        ]
    },
    'shrimp-burger': {
        nombre: 'Shrimp Burger',
        categoria: 'Gourmet',
        precio: 135,
        imagen: '../imagenes/hamburguesa_de_camaron.png',
        descripcion: 'Hamburguesa de camarón con salsa de ajo y limón.',
        ingredientes: [
            'Camarones frescos',
            'Pan brioche',
            'Salsa de ajo y limón',
            'Lechuga',
            'Tomate',
            'Palta',
            'Cebollín',
            'Perejil fresco'
        ]
    },
    'tofu-burger': {
        nombre: 'Tofu Delight',
        categoria: 'Vegetariana',
        precio: 84,
        imagen: '../imagenes/hamburguesa_tofu.png',
        descripcion: 'Hamburguesa de tofu marinado con salsa teriyaki.',
        ingredientes: [
            'Tofu firme',
            'Pan integral',
            'Salsa teriyaki',
            'Zanahoria rallada',
            'Espinacas',
            'Brotes de soja',
            'Sésamo',
            'Cebollín'
        ]
    },
    'all-american': {
        nombre: 'All American',
        categoria: 'Clásica',
        precio: 91,
        imagen: '../imagenes/hamburguesa_americana.png',
        descripcion: 'La clásica hamburguesa americana con todos los ingredientes tradicionales.',
        ingredientes: [
            'Carne de res 200g',
            'Pan con ajonjolí',
            'Queso americano',
            'Lechuga',
            'Tomate',
            'Cebolla',
            'Pepinillos',
            'Salsa especial'
        ]
    },
     // Acompañamientos
    'papas-gajo': {
        nombre: 'Papas Gajo Gourmet',
        categoria: 'Acompañamiento',
        precio: 18,
        imagen: '../imagenes/papas_gajos_gourmet.jpeg',
        descripcion: 'Papas gajo con piel y especias especiales, crocantes por fuera y suaves por dentro.',
        ingredientes: [
            'Papas seleccionadas',
            'Piel de papa',
            'Mezcla de especias gourmet',
            'Aceite de oliva',
            'Romero fresco',
            'Sal marina'
        ]
    },
    'papas-chili-queso': {
        nombre: 'Papas con Chili y Queso',
        categoria: 'Acompañamiento',
        precio: 32,
        imagen: '../imagenes/papas_con_chilli_y_queso.png',
        descripcion: 'Papas fritas cubiertas con chili con carne y queso cheddar derretido.',
        ingredientes: [
            'Papas fritas doradas',
            'Chili con carne casero',
            'Queso cheddar derretido',
            'Cebolla picada',
            'Crema agria',
            'Cilantro fresco'
        ]
    },
    'papas-rusticas': {
        nombre: 'Papas Rústicas con Romero',
        categoria: 'Acompañamiento',
        precio: 20,
        imagen: '../imagenes/papas_rustica_con_romero.jpg',
        descripcion: 'Papas rústicas horneadas con romero fresco y ajo, un acompañamiento clásico y delicioso.',
        ingredientes: [
            'Papas rústicas',
            'Romero fresco',
            'Ajo picado',
            'Aceite de oliva extra virgen',
            'Pimienta negra',
            'Sal de mar'
        ]
    },
    'tostones': {
        nombre: 'Tostones Caribeños',
        categoria: 'Acompañamiento',
        precio: 24,
        imagen: '../imagenes/tostones_caribeños.png',
        descripcion: 'Tostones de plátano verde fritos dos veces, crujientes por fuera y suaves por dentro.',
        ingredientes: [
            'Plátano verde',
            'Aceite vegetal',
            'Sal marina',
            'Mojo de ajo (opcional)'
        ]
    },
    'camarones-empanizados': {
        nombre: 'Camarones Empanizados',
        categoria: 'Acompañamiento',
        precio: 45,
        imagen: '../imagenes/camarones_empanisados.png',
        descripcion: 'Camarones frescos empanizados, dorados y crujientes, servidos con salsa cocktail.',
        ingredientes: [
            'Camarones medianos',
            'Pan molido especial',
            'Huevo',
            'Harina',
            'Salsa cocktail casera',
            'Limón'
        ]
    },
    'alitas-bbq-picante': {
        nombre: 'Alitas BBQ Picantes',
        categoria: 'Acompañamiento',
        precio: 38,
        imagen: '../imagenes/alitas_bbq.png',
        descripcion: 'Alitas de pollo bañadas en salsa BBQ picante, horneadas a la perfección.',
        ingredientes: [
            'Alitas de pollo',
            'Salsa BBQ picante',
            'Mantequilla',
            'Ajo',
            'Pimentón',
            'Salsa picante'
        ]
    },
    'palitos-mozzarella': {
        nombre: 'Palitos de Mozzarella',
        categoria: 'Acompañamiento',
        precio: 26,
        imagen: '../imagenes/palitos_de_mozzarella.jpg',
        descripcion: 'Palitos de mozzarella empanizados, perfectamente dorados y con queso fundente en su interior.',
        ingredientes: [
            'Queso mozzarella',
            'Pan molido italiano',
            'Harina',
            'Huevo',
            'Aceite para freír',
            'Salsa marinara'
        ]
    },
    'ensalada-cesar': {
        nombre: 'Ensalada César con Pollo',
        categoria: 'Acompañamiento',
        precio: 42,
        imagen: '../imagenes/ensalada_cesar_con_pollo.jpeg',
        descripcion: 'Clásica ensalada César con pollo a la parrilla, crutones caseros y aderezo César cremoso.',
        ingredientes: [
            'Lechuga romana',
            'Pollo a la parrilla',
            'Crutones caseros',
            'Queso parmesano',
            'Aderezo César',
            'Pimienta negra'
        ]
    },
    'maicitos-fritos': {
        nombre: 'Maicitos Fritos',
        categoria: 'Acompañamiento',
        precio: 19,
        imagen: '../imagenes/frito_con_queso_parmesano.jpg',
        descripcion: 'Maicitos fritos crujientes con queso parmesano rallado, un snack irresistible.',
        ingredientes: [
            'Maíz tierno',
            'Harina de maíz',
            'Queso parmesano',
            'Sal',
            'Aceite vegetal',
            'Perejil picado'
        ]
    },
    'croquetas-jamon': {
        nombre: 'Croquetas de Jamón Serrano',
        categoria: 'Acompañamiento',
        precio: 30,
        imagen: '../imagenes/croquetas_de_jamon_serrano.png',
        descripcion: 'Croquetas cremosas de jamón serrano, doradas y crujientes por fuera.',
        ingredientes: [
            'Jamón serrano picado',
            'Bechamel casera',
            'Pan rallado',
            'Huevo',
            'Nuez moscada',
            'Aceite de oliva'
        ]
    },
    'aros-pimiento': {
        nombre: 'Aros de Pimiento con Queso',
        categoria: 'Acompañamiento',
        precio: 23,
        imagen: '../imagenes/aros_de_pimiento_con_queso.jpg',
        descripcion: 'Aros de pimiento rellenos de queso fundente, empanizados y fritos hasta quedar dorados.',
        ingredientes: [
            'Pimientos morrones',
            'Queso mozzarella',
            'Harina',
            'Huevo',
            'Pan molido',
            'Salsa ranch'
        ]
    },
    'nuggets-queso': {
        nombre: 'Nuggets de Queso',
        categoria: 'Acompañamiento',
        precio: 27,
        imagen: '../imagenes/nuggets_de_queso.jpg',
        descripcion: 'Nuggets de queso fundente, perfectamente empanizados y dorados.',
        ingredientes: [
            'Queso cheddar',
            'Queso mozzarella',
            'Pan molido',
            'Harina',
            'Huevo',
            'Salsa barbacoa'
        ]
    },
    'brochetas-pollo': {
        nombre: 'Brochetas de Pollo',
        categoria: 'Acompañamiento',
        precio: 40,
        imagen: '../imagenes/brochetas_de_pollo.png',
        descripcion: 'Brochetas de pollo marinado con vegetales frescos, a la parrilla.',
        ingredientes: [
            'Pollo marinado',
            'Pimiento morrón',
            'Cebolla morada',
            'Piña',
            'Salsa teriyaki',
            'Aceite de oliva'
        ]
    },
    'papas-guacamole': {
        nombre: 'Papas con Guacamole',
        categoria: 'Acompañamiento',
        precio: 28,
        imagen: '../imagenes/papas_con_guacamole.png',
        descripcion: 'Papas fritas doradas acompañadas de guacamole fresco hecho al momento.',
        ingredientes: [
            'Papas fritas',
            'Aguacate maduro',
            'Tomate',
            'Cebolla morada',
            'Cilantro',
            'Jugo de limón'
        ]
    },
    'ensalada-griega': {
        nombre: 'Ensalada Griega',
        categoria: 'Acompañamiento',
        precio: 38,
        imagen: '../imagenes/ensalada_griega.png',
        descripcion: 'Ensalada estilo griego con queso feta, aceitunas y vegetales frescos.',
        ingredientes: [
            'Lechuga',
            'Tomate cherry',
            'Pepino',
            'Aceitunas kalamata',
            'Queso feta',
            'Aceite de oliva y orégano'
        ]
    },
    
        // Bebidas
    'coca-cola-500ml': {
        nombre: 'Coca-Cola',
        categoria: 'Bebida',
        precio: 12,
        imagen: '../imagenes/coca_cola.png',
        descripcion: 'La clásica gaseosa Coca-Cola de 500ml, refrescante y burbujeante.',
        ingredientes: ['Coca-Cola 500ml']
    },
    'sprite-500ml': {
        nombre: 'Sprite',
        categoria: 'Bebida',
        precio: 12,
        imagen: '../imagenes/sprite.png',
        descripcion: 'Sprite de 500ml, refrescante sabor a limón y lima.',
        ingredientes: ['Sprite 500ml']
    },
    'fanta-naranja': {
        nombre: 'Fanta Naranja',
        categoria: 'Bebida',
        precio: 12,
        imagen: '../imagenes/fanta_naranja.png',
        descripcion: 'Fanta Naranja de 500ml, sabor cítrico y refrescante.',
        ingredientes: ['Fanta Naranja 500ml']
    },
    'pepsi-500ml': {
        nombre: 'Pepsi',
        categoria: 'Bebida',
        precio: 11,
        imagen: '../imagenes/pepsi.png',
        descripcion: 'Pepsi de 500ml, la alternativa clásica de cola.',
        ingredientes: ['Pepsi 500ml']
    },
    'inca-kola': {
        nombre: 'Inca Kola',
        categoria: 'Bebida',
        precio: 12,
        imagen: '../imagenes/inka_cola.png',
        descripcion: 'Inca Kola de 500ml, sabor único a hierba luisa.',
        ingredientes: ['Inca Kola 500ml']
    },
    'seven-up': {
        nombre: '7UP',
        categoria: 'Bebida',
        precio: 11,
        imagen: '../imagenes/7up.png',
        descripcion: '7UP de 500ml, refrescante y con burbujas.',
        ingredientes: ['7UP 500ml']
    },
    'jugo-naranja': {
        nombre: 'Jugo de Naranja',
        categoria: 'Bebida',
        precio: 16,
        imagen: '../imagenes/jugo_de_naranja.jpg',
        descripcion: 'Jugo de naranja natural recién exprimido, 500ml.',
        ingredientes: ['Naranjas frescas', 'Azúcar (opcional)', 'Hielo']
    },
    'jugo-pina': {
        nombre: 'Jugo de Piña',
        categoria: 'Bebida',
        precio: 15,
        imagen: '../imagenes/jugo_de_piña.png',
        descripcion: 'Jugo de piña natural, refrescante y digestivo, 500ml.',
        ingredientes: ['Piña fresca', 'Agua', 'Hielo']
    },
    'jugo-maracuya': {
        nombre: 'Jugo de Maracuyá',
        categoria: 'Bebida',
        precio: 18,
        imagen: '../imagenes/jugo_de_maracuya.png',
        descripcion: 'Jugo de maracuyá natural, exótico y refrescante, 500ml.',
        ingredientes: ['Maracuyá', 'Agua', 'Azúcar', 'Hielo']
    },
    'jugo-papaya': {
        nombre: 'Jugo de Papaya',
        categoria: 'Bebida',
        precio: 14,
        imagen: '../imagenes/jugo_de_papaya.avif',
        descripcion: 'Jugo de papaya natural, suave y digestivo, 500ml.',
        ingredientes: ['Papaya madura', 'Agua', 'Azúcar', 'Hielo']
    },
    'mocochinchi': {
        nombre: 'Mocochinchi',
        categoria: 'Bebida',
        precio: 10,
        imagen: '../imagenes/mocochinchi.png',
        descripcion: 'Bebida tradicional boliviana de durazno seco, 500ml.',
        ingredientes: ['Durazno seco', 'Canela', 'Clavo de olor', 'Azúcar']
    },
    'limonada-menta': {
        nombre: 'Limonada de Menta',
        categoria: 'Bebida',
        precio: 16,
        imagen: '../imagenes/limonada_de_menta.png',
        descripcion: 'Limonada refrescante con menta fresca, 500ml.',
        ingredientes: ['Limones', 'Menta fresca', 'Azúcar', 'Agua', 'Hielo']
    },
    'agua-gas': {
        nombre: 'Agua con Gas',
        categoria: 'Bebida',
        precio: 9,
        imagen: '../imagenes/agua_con_gas.png',
        descripcion: 'Agua mineral con gas, 500ml.',
        ingredientes: ['Agua mineral con gas']
    },
    'malteada-chocolate': {
        nombre: 'Malteada de Chocolate',
        categoria: 'Bebida',
        precio: 25,
        imagen: '../imagenes/mateada_de_chocolate.png',
        descripcion: 'Malteada cremosa de chocolate con topping de crema batida, 400ml.',
        ingredientes: ['Helado de chocolate', 'Leche', 'Sirope de chocolate', 'Crema batida']
    },
    'malteada-vainilla': {
        nombre: 'Malteada de Vainilla',
        categoria: 'Bebida',
        precio: 25,
        imagen: '../imagenes/malteada_de_vainilla.jpg',
        descripcion: 'Malteada cremosa de vainilla con topping de crema batida, 400ml.',
        ingredientes: ['Helado de vainilla', 'Leche', 'Sirope de caramelo', 'Crema batida']
    },
    'malteada-fresa': {
        nombre: 'Malteada de Fresa',
        categoria: 'Bebida',
        precio: 25,
        imagen: '../imagenes/malteada_de_fresa.jpg',
        descripcion: 'Malteada cremosa de fresa con topping de crema batida, 400ml.',
        ingredientes: ['Helado de fresa', 'Leche', 'Sirope de fresa', 'Crema batida']
    },
    'cerveza-pacena': {
        nombre: 'Cerveza Paceña',
        categoria: 'Bebida',
        precio: 18,
        imagen: '../imagenes/cerveza_paceña.png',
        descripcion: 'La cerveza paceña, tradicional de La Paz, Bolivia, 355ml.',
        ingredientes: ['Cerveza Paceña 355ml']
    },
    'cerveza-huari': {
        nombre: 'Cerveza Huari',
        categoria: 'Bebida',
        precio: 18,
        imagen: '../imagenes/cerveza_huari.png',
        descripcion: 'Cerveza boliviana tradicional, originaria de Oruro, 355ml.',
        ingredientes: ['Cerveza Huari 355ml']
    },
    'cerveza-ducal': {
        nombre: 'Cerveza Ducal',
        categoria: 'Bebida',
        precio: 17,
        imagen: '../imagenes/cerveza_ducal.png',
        descripcion: 'Cerveza rubia boliviana, suave y refrescante, 355ml.',
        ingredientes: ['Cerveza Ducal 355ml']
    },
    'cerveza-corona': {
        nombre: 'Cerveza Corona',
        categoria: 'Bebida',
        precio: 22,
        imagen: '../imagenes/cerveza_corona.png',
        descripcion: 'Cerveza mexicana clara, refrescante, 355ml.',
        ingredientes: ['Cerveza Corona 355ml']
    },
    // Combos
    'combo-individual': {
        nombre: 'Combo Individual',
        categoria: 'Combo',
        precio: 110,
        imagen: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        descripcion: 'Combo perfecto para una persona: hamburguesa a elección, papas gajo y bebida de 500ml.',
        ingredientes: [
            '1 Hamburguesa a elección',
            'Papas Gajo Gourmet',
            'Bebida de 500ml (a elección)',
            'Salsas adicionales',
            'Servilletas y cubiertos'
        ],
        detallesEspeciales: 'Incluye ahorro de Bs. 7 respecto a comprar los productos por separado.'
    },
    'combo-familiar': {
        nombre: 'Combo Familiar',
        categoria: 'Combo',
        precio: 280,
        imagen: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        descripcion: 'Ideal para compartir en familia: 3 hamburguesas, 2 porciones grandes de papas, 3 bebidas y postre.',
        ingredientes: [
            '3 Hamburguesas a elección',
            '2 Porciones grandes de papas',
            '3 Bebidas de 500ml',
            'Postre sorpresa',
            'Salsas variadas',
            'Servilletas y cubiertos para todos'
        ],
        detallesEspeciales: 'Ahorras Bs. 45 (máximo ahorro) - Perfecto para 3-4 personas.'
    },
    'combo-inferno': {
        nombre: 'Combo Inferno',
        categoria: 'Combo Picante',
        precio: 160,
        imagen: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        descripcion: 'Combo para amantes del picante: hamburguesa picante, papas con chili y bebida refrescante.',
        ingredientes: [
            'Hamburguesa picante a elección',
            'Papas con Chili y Queso',
            'Bebida refrescante de 500ml',
            'Salsas picantes adicionales',
            'Servilletas extra'
        ],
        detallesEspeciales: 'Ahorro de Bs. 20 - ¡Solo para valientes!'
    }
};

// Carrito de compras
let carrito = [];

// Paso actual del checkout
let pasoActual = 'cart';

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTROS
// ============================================

// Función para inicializar buscador
function inicializarBuscador() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (!searchInput || !searchButton) return;
    
    // Buscar al hacer clic en el botón
    searchButton.addEventListener('click', () => {
        buscarProductos(searchInput.value.trim());
    });
    
    // Buscar al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarProductos(searchInput.value.trim());
        }
    });
}

// Función para buscar productos
function buscarProductos(termino) {
    if (!termino) {
        mostrarNotificacion('Por favor ingresa un término de búsqueda', 'info');
        return;
    }
    
    termino = termino.toLowerCase();
    const resultados = [];
    
    // Buscar en todos los productos
    for (const id in productosDetalles) {
        const producto = productosDetalles[id];
        
        // Buscar en nombre, categoría y descripción
        if (producto.nombre.toLowerCase().includes(termino) ||
            producto.categoria.toLowerCase().includes(termino) ||
            producto.descripcion.toLowerCase().includes(termino)) {
            resultados.push({
                id: id,
                producto: producto
            });
        }
    }
    
    if (resultados.length === 0) {
        mostrarNotificacion('No se encontraron productos con ese término', 'info');
        return;
    }
    
    // Mostrar resultados en una ventana modal
    mostrarResultadosBusqueda(resultados);
}

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
    // Crear modal de resultados
    const modalHTML = `
        <div class="search-results-modal active">
            <div class="search-results-container">
                <div class="search-results-header">
                    <h3><i class="fas fa-search"></i> Resultados de búsqueda (${resultados.length})</h3>
                    <button class="close-search-results">&times;</button>
                </div>
                <div class="search-results-body">
                    ${resultados.map(item => `
                        <div class="search-result-card" data-product="${item.id}">
                            <div class="search-result-image">
                                <img src="${item.producto.imagen}" alt="${item.producto.nombre}">
                            </div>
                            <div class="search-result-info">
                                <h4>${item.producto.nombre}</h4>
                                <p class="search-result-category">${item.producto.categoria}</p>
                                <p class="search-result-description">${item.producto.descripcion.substring(0, 100)}...</p>
                                <div class="search-result-price">Bs. ${item.producto.precio}</div>
                            </div>
                            <div class="search-result-actions">
                                <button class="btn btn-details" data-product-detail="${item.id}">
                                    <i class="fas fa-eye"></i> Ver
                                </button>
                                <button class="btn order-btn-card" data-product="${item.id}">
                                    <i class="fas fa-cart-plus"></i> Ordenar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay
    const existingModal = document.querySelector('.search-results-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Agregar estilos CSS
    agregarEstilosResultadosBusqueda();
    
    // Configurar event listeners
    const modal = document.querySelector('.search-results-modal');
    const closeBtn = document.querySelector('.close-search-results');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Inicializar botones de los resultados
    inicializarBotonesResultados(modal);
}

// Función para inicializar filtro por presupuesto
function inicializarFiltroPresupuesto() {
    const budgetRange = document.getElementById('budget-range');
    const budgetValue = document.getElementById('budget-value');
    const filterByBudgetBtn = document.getElementById('filter-by-budget');
    
    if (!budgetRange || !budgetValue || !filterByBudgetBtn) return;
    
    // Actualizar valor mostrado
    budgetRange.addEventListener('input', function() {
        budgetValue.textContent = `Bs. ${this.value}`;
    });
    
    // Filtrar al hacer clic
    filterByBudgetBtn.addEventListener('click', () => {
        const maxBudget = parseInt(budgetRange.value);
        filtrarPorPresupuesto(maxBudget);
    });
}

// Función para filtrar productos por presupuesto
function filtrarPorPresupuesto(maxBudget) {
    const resultados = [];
    
    for (const id in productosDetalles) {
        const producto = productosDetalles[id];
        
        if (producto.precio <= maxBudget) {
            resultados.push({
                id: id,
                producto: producto
            });
        }
    }
    
    if (resultados.length === 0) {
        mostrarNotificacion(`No hay productos menores a Bs. ${maxBudget}`, 'info');
        return;
    }
    
    // Ordenar por precio (más baratos primero)
    resultados.sort((a, b) => a.producto.precio - b.producto.precio);
    
    // Mostrar resultados
    mostrarResultadosPresupuesto(resultados, maxBudget);
}

// Función para mostrar resultados de filtro por presupuesto
function mostrarResultadosPresupuesto(resultados, maxBudget) {
    // Crear modal de resultados
    const modalHTML = `
        <div class="budget-results-modal active">
            <div class="budget-results-container">
                <div class="budget-results-header">
                    <h3><i class="fas fa-wallet"></i> Productos hasta Bs. ${maxBudget} (${resultados.length})</h3>
                    <button class="close-budget-results">&times;</button>
                </div>
                <div class="budget-results-body">
                    ${resultados.map(item => `
                        <div class="budget-result-card" data-product="${item.id}">
                            <div class="budget-result-image">
                                <img src="${item.producto.imagen}" alt="${item.producto.nombre}">
                                <div class="budget-result-price-badge">Bs. ${item.producto.precio}</div>
                            </div>
                            <div class="budget-result-info">
                                <h4>${item.producto.nombre}</h4>
                                <p class="budget-result-category">${item.producto.categoria}</p>
                                <p class="budget-result-savings">
                                    <i class="fas fa-coins"></i> Te sobran Bs. ${(maxBudget - item.producto.precio).toFixed(2)}
                                </p>
                            </div>
                            <div class="budget-result-actions">
                                <button class="btn btn-details" data-product-detail="${item.id}">
                                    <i class="fas fa-eye"></i> Ver
                                </button>
                                <button class="btn order-btn-card" data-product="${item.id}">
                                    <i class="fas fa-cart-plus"></i> Ordenar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay
    const existingModal = document.querySelector('.budget-results-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Agregar estilos CSS
    agregarEstilosFiltroPresupuesto();
    
    // Configurar event listeners
    const modal = document.querySelector('.budget-results-modal');
    const closeBtn = document.querySelector('.close-budget-results');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Inicializar botones de los resultados
    inicializarBotonesResultados(modal);
}

// ============================================
// FUNCIONES DE DETALLES DE PRODUCTO
// ============================================

// Función para mostrar detalles del producto
function mostrarDetallesProducto(productId) {
    const producto = productosDetalles[productId];
    if (!producto) {
        console.error('Producto no encontrado:', productId);
        mostrarNotificacion('Producto no encontrado', 'error');
        return;
    }

    // Actualizar contenido del modal
    document.getElementById('detalle-categoria').textContent = producto.categoria;
    document.getElementById('detalle-titulo').textContent = producto.nombre;
    document.getElementById('detalle-imagen').src = producto.imagen;
    document.getElementById('detalle-imagen').alt = producto.nombre;
    document.getElementById('detalle-descripcion').textContent = producto.descripcion;
    document.getElementById('detalle-precio').textContent = `Bs. ${producto.precio}`;

    // Actualizar lista de ingredientes
    const ingredientesLista = document.getElementById('detalle-ingredientes-lista');
    ingredientesLista.innerHTML = '';
    
    // Añadir detalles especiales si existen
    if (producto.detallesEspeciales) {
        const specialLi = document.createElement('li');
        specialLi.innerHTML = `<strong><i class="fas fa-star"></i> Especial:</strong> ${producto.detallesEspeciales}`;
        specialLi.style.color = '#FF6B35';
        ingredientesLista.appendChild(specialLi);
    }
    
    // Añadir ingredientes normales
    producto.ingredientes.forEach(ingrediente => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${ingrediente}`;
        ingredientesLista.appendChild(li);
    });

    // Configurar botón de ordenar
    const ordenarBtn = document.getElementById('detalle-ordenar-btn');
    ordenarBtn.onclick = function() {
        agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
        cerrarDetallesProducto();
    };

    // Mostrar el modal
    const modal = document.querySelector('.producto-detalle');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar detalles del producto
function cerrarDetallesProducto() {
    const modal = document.querySelector('.producto-detalle');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio, imagen = null) {
    // Extraer el valor numérico del precio si viene como string "Bs. XX"
    let precioNumerico;
    if (typeof precio === 'string') {
        precioNumerico = parseFloat(precio.replace('Bs. ', '').trim());
    } else {
        precioNumerico = precio;
    }
    
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
        productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precioNumerico,
            cantidad: 1,
            subtotal: precioNumerico,
            imagen: imagen || 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        });
    }
    
    actualizarCarritoUI();
    mostrarNotificacion(`¡${nombre} agregado al carrito!`, 'success');
}

// Remover producto del carrito
function removerDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarritoUI();
    mostrarNotificacion(`Producto removido del carrito`, 'info');
}

// Actualizar cantidad de producto
function actualizarCantidad(nombre, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        removerDelCarrito(nombre);
        return;
    }
    
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad = nuevaCantidad;
        producto.subtotal = producto.cantidad * producto.precio;
        actualizarCarritoUI();
    }
}

// Calcular totales
function calcularTotales() {
    let subtotal = 0;
    let iva = 0;
    let envio = 0;
    
    carrito.forEach(item => {
        subtotal += item.subtotal;
    });
    
    iva = subtotal * 0.13; // 13% IVA
    envio = subtotal > 150 ? 0 : 15; // Envío gratis sobre Bs. 150
    
    return {
        subtotal: subtotal.toFixed(2),
        iva: iva.toFixed(2),
        envio: envio.toFixed(2),
        total: (parseFloat(subtotal) + parseFloat(iva) + parseFloat(envio)).toFixed(2)
    };
}

// Actualizar interfaz del carrito
function actualizarCarritoUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotals = document.getElementById('cart-totals');
    const basicActions = document.getElementById('basic-actions');
    const progressSteps = document.getElementById('progress-steps');
    const cartNavigation = document.getElementById('cart-navigation');
    
    // Actualizar contador
    if (cartCount) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = totalItems;
    }
    
    // Verificar si los elementos existen
    if (!cartItems) return;
    
    // Mostrar u ocultar elementos según si hay productos
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        if (cartTotals) cartTotals.style.display = 'none';
        if (basicActions) basicActions.style.display = 'none';
        if (progressSteps) progressSteps.style.display = 'none';
        if (cartNavigation) cartNavigation.style.display = 'none';
        return;
    }
    
    // Mostrar elementos
    if (cartTotals) cartTotals.style.display = 'block';
    if (basicActions) basicActions.style.display = 'flex';
    
    // Generar HTML de items
    cartItems.innerHTML = '';
    carrito.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-image">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-price">Bs. ${item.precio.toFixed(2)}</div>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrement" data-product="${item.nombre}">-</button>
                        <div class="quantity-display">${item.cantidad}</div>
                        <button class="quantity-btn increment" data-product="${item.nombre}">+</button>
                    </div>
                    <button class="remove-item-btn" data-product="${item.nombre}">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            </div>
        `;
        cartItems.innerHTML += itemHTML;
    });
    
    // Actualizar totales
    const totales = calcularTotales();
    const subtotalElement = document.getElementById('subtotal');
    const ivaElement = document.getElementById('iva');
    const envioElement = document.getElementById('envio');
    const totalElement = document.getElementById('total');
    const qrAmountElement = document.getElementById('qr-amount');
    
    if (subtotalElement) subtotalElement.textContent = `Bs. ${totales.subtotal}`;
    if (ivaElement) ivaElement.textContent = `Bs. ${totales.iva}`;
    if (envioElement) envioElement.textContent = `Bs. ${totales.envio}`;
    if (totalElement) totalElement.textContent = `Bs. ${totales.total}`;
    if (qrAmountElement) qrAmountElement.textContent = `Bs. ${totales.total}`;
    
    // Agregar event listeners a los controles
    document.querySelectorAll('.decrement').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const item = carrito.find(item => item.nombre === productName);
            if (item) {
                actualizarCantidad(productName, item.cantidad - 1);
            }
        });
    });
    
    document.querySelectorAll('.increment').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const item = carrito.find(item => item.nombre === productName);
            if (item) {
                actualizarCantidad(productName, item.cantidad + 1);
            }
        });
    });
    
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            removerDelCarrito(productName);
        });
    });
}

// ============================================
// MODAL DEL CARRITO
// ============================================

function inicializarModalCarrito() {
    const cartToggle = document.querySelector('.cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!cartToggle || !cartModal) return;
    
    // Abrir modal
    cartToggle.addEventListener('click', () => {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        actualizarCarritoUI();
    });
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetearPasos();
        });
    }
    
    // Cerrar al hacer clic fuera
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetearPasos();
        }
    });
    
    // Vaciar carrito
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            carrito = [];
            actualizarCarritoUI();
            mostrarNotificacion('Carrito vaciado', 'info');
        });
    }
    
    // Proceder al pago
    const startCheckoutBtn = document.getElementById('start-checkout');
    if (startCheckoutBtn) {
        startCheckoutBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                mostrarNotificacion('Tu carrito está vacío', 'error');
                return;
            }
            pasoActual = 'customer';
            actualizarPasos();
        });
    }
    
    // Navegación entre pasos
    const nextToPaymentBtn = document.getElementById('next-to-payment');
    if (nextToPaymentBtn) {
        nextToPaymentBtn.addEventListener('click', () => {
            if (validarDatosCliente()) {
                pasoActual = 'payment';
                actualizarPasos();
            }
        });
    }
    
    const backToCartBtn = document.getElementById('back-to-cart');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', () => {
            pasoActual = 'cart';
            actualizarPasos();
        });
    }
    
    const backToCustomerBtn = document.getElementById('back-to-customer');
    if (backToCustomerBtn) {
        backToCustomerBtn.addEventListener('click', () => {
            pasoActual = 'customer';
            actualizarPasos();
        });
    }
    
    // Métodos de pago
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.payment-method-btn').forEach(b => {
                b.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const metodo = this.getAttribute('data-method');
            const qrInfo = document.getElementById('qr-info');
            const cardInfo = document.getElementById('card-info');
            
            if (qrInfo) qrInfo.style.display = metodo === 'qr' ? 'block' : 'none';
            if (cardInfo) cardInfo.style.display = metodo === 'tarjeta' ? 'block' : 'none';
        });
    });
    
    // Enviar pedido
    const sendOrderBtn = document.getElementById('send-order-btn');
    if (sendOrderBtn) {
        sendOrderBtn.addEventListener('click', enviarPedido);
    }
}

// Actualizar pasos del checkout
function actualizarPasos() {
    const stepCart = document.getElementById('step-cart');
    const stepCustomer = document.getElementById('step-customer');
    const stepPayment = document.getElementById('step-payment');
    const customerSection = document.getElementById('customer-section');
    const paymentSection = document.getElementById('payment-section');
    const basicActions = document.getElementById('basic-actions');
    const cartNavigation = document.getElementById('cart-navigation');
    const stepButtons = document.querySelector('.step-buttons');
    const paymentButtons = document.getElementById('payment-buttons');
    
    // Resetear todos los pasos
    if (stepCart) stepCart.classList.remove('active', 'completed');
    if (stepCustomer) stepCustomer.classList.remove('active', 'completed');
    if (stepPayment) stepPayment.classList.remove('active', 'completed');
    
    if (customerSection) customerSection.style.display = 'none';
    if (paymentSection) paymentSection.style.display = 'none';
    if (basicActions) basicActions.style.display = 'none';
    if (cartNavigation) cartNavigation.style.display = 'none';
    if (stepButtons) stepButtons.style.display = 'none';
    if (paymentButtons) paymentButtons.style.display = 'none';
    
    switch(pasoActual) {
        case 'cart':
            if (stepCart) stepCart.classList.add('active');
            if (basicActions) basicActions.style.display = 'flex';
            break;
            
        case 'customer':
            if (stepCart) stepCart.classList.add('completed');
            if (stepCustomer) stepCustomer.classList.add('active');
            if (customerSection) customerSection.style.display = 'block';
            if (cartNavigation) cartNavigation.style.display = 'block';
            if (stepButtons) stepButtons.style.display = 'flex';
            break;
            
        case 'payment':
            if (stepCart) stepCart.classList.add('completed');
            if (stepCustomer) stepCustomer.classList.add('completed');
            if (stepPayment) stepPayment.classList.add('active');
            if (customerSection) customerSection.style.display = 'block';
            if (paymentSection) paymentSection.style.display = 'block';
            if (cartNavigation) cartNavigation.style.display = 'block';
            if (paymentButtons) paymentButtons.style.display = 'flex';
            break;
    }
}

// Resetear pasos al volver al carrito
function resetearPasos() {
    pasoActual = 'cart';
    actualizarPasos();
}

// ============================================
// VALIDACIÓN DE FORMULARIOS
// ============================================

function validarDatosCliente() {
    const nombreInput = document.getElementById('cart-customer-name');
    const telefonoInput = document.getElementById('cart-customer-phone');
    const emailInput = document.getElementById('cart-customer-email');
    
    if (!nombreInput || !telefonoInput) return false;
    
    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const email = emailInput ? emailInput.value.trim() : '';
    
    if (!nombre) {
        mostrarNotificacion('Por favor ingresa tu nombre completo', 'error');
        nombreInput.focus();
        return false;
    }
    
    if (!telefono) {
        mostrarNotificacion('Por favor ingresa tu teléfono', 'error');
        telefonoInput.focus();
        return false;
    }
    
    // Validar formato de teléfono (solo números, mínimo 7 dígitos)
    const telefonoRegex = /^\d{7,15}$/;
    if (!telefonoRegex.test(telefono)) {
        mostrarNotificacion('Por favor ingresa un número de teléfono válido', 'error');
        telefonoInput.focus();
        return false;
    }
    
    // Validar email si se proporcionó
    if (email && !validarEmail(email)) {
        mostrarNotificacion('Por favor ingresa un email válido', 'error');
        if (emailInput) emailInput.focus();
        return false;
    }
    
    return true;
}

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// ENVÍO DE PEDIDO
// ============================================

function enviarPedido() {
    // Validar método de pago seleccionado
    const metodoPagoSeleccionado = document.querySelector('.payment-method-btn.selected');
    if (!metodoPagoSeleccionado) {
        mostrarNotificacion('Por favor selecciona un método de pago', 'error');
        return;
    }
    
    // Obtener datos del formulario
    const nombreInput = document.getElementById('cart-customer-name');
    const telefonoInput = document.getElementById('cart-customer-phone');
    const emailInput = document.getElementById('cart-customer-email');
    const direccionInput = document.getElementById('cart-customer-address');
    const notasInput = document.getElementById('cart-customer-notes');
    
    if (!nombreInput || !telefonoInput || !direccionInput) return;
    
    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const email = emailInput ? emailInput.value.trim() : '';
    const direccion = direccionInput.value.trim();
    const notas = notasInput ? notasInput.value.trim() : '';
    const metodoPago = metodoPagoSeleccionado.getAttribute('data-method');
    
    // Validar dirección si es entrega a domicilio
    if (!direccion) {
        mostrarNotificacion('Por favor ingresa la dirección de entrega', 'error');
        direccionInput.focus();
        return;
    }
    
    // Mostrar indicador de carga
    const sendButton = document.getElementById('send-order-btn');
    if (!sendButton) return;
    
    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<span class="loading-spinner"></span> Procesando pedido...';
    sendButton.disabled = true;
    
    // Simular envío del pedido
    setTimeout(() => {
        // Construir resumen del pedido
        const totales = calcularTotales();
        const resumenPedido = {
            cliente: { nombre, telefono, email, direccion, notas },
            pedido: carrito,
            totales: totales,
            metodoPago: metodoPago,
            fecha: new Date().toISOString(),
            numeroPedido: 'PED-' + Date.now().toString().slice(-6)
        };
        
        // Aquí normalmente enviarías el pedido a tu servidor
        console.log('Pedido enviado:', resumenPedido);
        
        // Mostrar mensaje de éxito
        mostrarNotificacion(`¡Pedido #${resumenPedido.numeroPedido} enviado con éxito! Te contactaremos pronto.`, 'success');
        
        // Cerrar modal y limpiar carrito
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
        carrito = [];
        actualizarCarritoUI();
        resetearPasos();
        limpiarFormularioCliente();
        
        // Restaurar botón
        sendButton.innerHTML = originalText;
        sendButton.disabled = false;
        
    }, 2000);
}

function limpiarFormularioCliente() {
    const nombreInput = document.getElementById('cart-customer-name');
    const telefonoInput = document.getElementById('cart-customer-phone');
    const emailInput = document.getElementById('cart-customer-email');
    const direccionInput = document.getElementById('cart-customer-address');
    const notasInput = document.getElementById('cart-customer-notes');
    
    if (nombreInput) nombreInput.value = '';
    if (telefonoInput) telefonoInput.value = '';
    if (emailInput) emailInput.value = '';
    if (direccionInput) direccionInput.value = '';
    if (notasInput) notasInput.value = '';
    
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const qrInfo = document.getElementById('qr-info');
    const cardInfo = document.getElementById('card-info');
    
    if (qrInfo) qrInfo.style.display = 'none';
    if (cardInfo) cardInfo.style.display = 'none';
}

// ============================================
// NOTIFICACIONES
// ============================================

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.innerHTML = `
        <span>${mensaje}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Estilos básicos si no existen en CSS
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Colores según tipo
    if (tipo === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (tipo === 'error') {
        notification.style.backgroundColor = '#F44336';
    } else if (tipo === 'info') {
        notification.style.backgroundColor = '#2196F3';
    } else {
        notification.style.backgroundColor = '#333';
    }
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        line-height: 1;
    `;
    
    // Agregar al documento
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    const autoRemove = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Remover al hacer clic
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    });
}

// ============================================
// NEWSLETTER
// ============================================

function inicializarNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const errorElement = document.getElementById('email-error');
        
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        // Validar email
        if (!validarEmail(email)) {
            if (errorElement) {
                errorElement.textContent = 'Por favor ingresa un email válido';
                errorElement.style.display = 'block';
            }
            emailInput.focus();
            return;
        }
        
        // Limpiar error
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        // Simular envío
        emailInput.disabled = true;
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Suscribiendo...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            mostrarNotificacion('¡Gracias por suscribirte! Pronto recibirás nuestras ofertas.', 'success');
            emailInput.value = '';
            emailInput.disabled = false;
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function formatPrecio(precio) {
    return `Bs. ${parseFloat(precio).toFixed(2)}`;
}

// Función para inicializar botones en resultados de búsqueda
function inicializarBotonesResultados(modal) {
    if (!modal) return;
    
    // Inicializar botones de detalles
    modal.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-detail');
            modal.remove();
            document.body.style.overflow = 'auto';
            mostrarDetallesProducto(productId);
        });
    });
    
    // Inicializar botones de ordenar
    modal.querySelectorAll('.order-btn-card').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const producto = productosDetalles[productId];
            
            if (producto) {
                agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// ============================================
// INICIALIZACIÓN DE BOTONES DE ORDENAR
// ============================================

function inicializarBotonesOrdenar() {
    // Botones "Ordenar" en tarjetas de productos
    document.querySelectorAll('.order-btn-card, .add-to-cart, .combo-btn').forEach(btn => {
        // Remover event listeners antiguos
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Agregar nuevo event listener
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-product');
            
            if (!productId) {
                console.error('Botón sin data-product:', this);
                mostrarNotificacion('Error: Producto no identificado', 'error');
                return;
            }
            
            const producto = productosDetalles[productId];
            
            if (producto) {
                agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
            } else {
                console.error('Producto no encontrado:', productId);
                mostrarNotificacion('Error: Producto no disponible', 'error');
            }
        });
    });
}

// ============================================
// AGREGAR ESTILOS CSS
// ============================================

function agregarEstilosResultadosBusqueda() {
    if (document.querySelector('#search-results-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'search-results-styles';
    style.textContent = `
        .search-results-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-y: auto;
        }
        
        .search-results-modal.active {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        
        .search-results-container {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border-radius: 20px;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border: 3px solid #FF6B35;
            box-shadow: 0 25px 60px rgba(255, 107, 53, 0.4);
        }
        
        .search-results-header {
            background: linear-gradient(135deg, #FF6B35 0%, #D62828 100%);
            color: white;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 17px 17px 0 0;
        }
        
        .search-results-header h3 {
            margin: 0;
            font-family: 'Oswald', sans-serif;
            font-size: 24px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .close-search-results {
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: transform 0.3s ease;
        }
        
        .close-search-results:hover {
            transform: rotate(90deg);
        }
        
        .search-results-body {
            padding: 30px;
            display: grid;
            gap: 20px;
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .search-result-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 20px;
            display: flex;
            gap: 20px;
            align-items: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 107, 53, 0.2);
        }
        
        .search-result-card:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-5px);
            border-color: #FF6B35;
        }
        
        .search-result-image {
            width: 120px;
            height: 120px;
            border-radius: 10px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .search-result-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .search-result-info {
            flex: 1;
        }
        
        .search-result-info h4 {
            color: white;
            margin: 0 0 10px 0;
            font-size: 20px;
            font-family: 'Bebas Neue', sans-serif;
        }
        
        .search-result-category {
            color: #FF6B35;
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 10px 0;
            text-transform: uppercase;
        }
        
        .search-result-description {
            color: #bbb;
            font-size: 14px;
            margin: 0 0 10px 0;
            line-height: 1.4;
        }
        
        .search-result-price {
            color: #FFD166;
            font-size: 24px;
            font-weight: bold;
            font-family: 'Oswald', sans-serif;
        }
        
        .search-result-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-width: 120px;
        }
        
        @media (max-width: 768px) {
            .search-result-card {
                flex-direction: column;
                text-align: center;
            }
            
            .search-result-actions {
                flex-direction: row;
                justify-content: center;
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

function agregarEstilosFiltroPresupuesto() {
    if (document.querySelector('#budget-filter-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'budget-filter-styles';
    style.textContent = `
        .budget-results-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-y: auto;
        }
        
        .budget-results-modal.active {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        
        .budget-results-container {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border-radius: 20px;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border: 3px solid #FFD166;
            box-shadow: 0 25px 60px rgba(255, 209, 102, 0.4);
        }
        
        .budget-results-header {
            background: linear-gradient(135deg, #FFD166 0%, #FFB347 100%);
            color: #8B0000;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 17px 17px 0 0;
        }
        
        .budget-results-header h3 {
            margin: 0;
            font-family: 'Oswald', sans-serif;
            font-size: 24px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .close-budget-results {
            background: none;
            border: none;
            color: #8B0000;
            font-size: 30px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: transform 0.3s ease;
            font-weight: bold;
        }
        
        .close-budget-results:hover {
            transform: rotate(90deg);
        }
        
        .budget-results-body {
            padding: 30px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .budget-result-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 209, 102, 0.2);
            position: relative;
        }
        
        .budget-result-card:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-5px);
            border-color: #FFD166;
        }
        
        .budget-result-image {
            width: 100%;
            height: 150px;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 15px;
            position: relative;
        }
        
        .budget-result-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .budget-result-price-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #FF6B35;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        
        .budget-result-info {
            width: 100%;
        }
        
        .budget-result-info h4 {
            color: white;
            margin: 0 0 10px 0;
            font-size: 18px;
            font-family: 'Bebas Neue', sans-serif;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .budget-result-category {
            color: #FFD166;
            font-size: 12px;
            font-weight: bold;
            margin: 0 0 10px 0;
            text-transform: uppercase;
        }
        
        .budget-result-savings {
            color: #20c997;
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        
        .budget-result-actions {
            display: flex;
            gap: 10px;
            width: 100%;
            margin-top: 10px;
        }
        
        .budget-result-actions .btn {
            flex: 1;
            padding: 8px 12px;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
}

// Añadir animaciones CSS si no existen
function agregarEstilosAnimaciones() {
    if (document.querySelector('#animations-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'animations-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado, inicializando...');
    
    // Inicializar buscador
    inicializarBuscador();
    
    // Inicializar filtro por presupuesto
    inicializarFiltroPresupuesto();
    
    // Inicializar detalles de productos
    document.querySelectorAll('.btn-details, .combo-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-detail');
            if (productId) {
                mostrarDetallesProducto(productId);
            }
        });
    });

    // Configurar botón de cerrar detalles
    const cerrarBtn = document.querySelector('.detalle-cerrar');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', cerrarDetallesProducto);
    }

    // Cerrar modal al hacer clic fuera del contenido
    const modal = document.querySelector('.producto-detalle');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarDetallesProducto();
            }
        });
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarDetallesProducto();
            const cartModal = document.getElementById('cart-modal');
            if (cartModal && cartModal.classList.contains('active')) {
                cartModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                resetearPasos();
            }
            
            // Cerrar modales de búsqueda y presupuesto
            const searchModal = document.querySelector('.search-results-modal');
            const budgetModal = document.querySelector('.budget-results-modal');
            
            if (searchModal) {
                searchModal.remove();
                document.body.style.overflow = 'auto';
            }
            
            if (budgetModal) {
                budgetModal.remove();
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Inicializar botones de ordenar
    inicializarBotonesOrdenar();
    
    // Inicializar carrito
    inicializarModalCarrito();
    
    // Inicializar newsletter (si existe)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email');
            if (email && email.value) {
                mostrarNotificacion('¡Gracias por suscribirte! Pronto recibirás nuestras ofertas.', 'success');
                email.value = '';
            }
        });
    }
    
    // Agregar estilos de animaciones
    agregarEstilosAnimaciones();
    
    // Inicializar paso actual del carrito
    if (document.getElementById('cart-modal')) {
        actualizarPasos();
    }
    
    // Forzar nueva inicialización después de 1 segundo para asegurar que todos los elementos estén cargados
    setTimeout(() => {
        console.log('Re-inicializando botones de ordenar...');
        inicializarBotonesOrdenar();
    }, 1000);
});

// ============================================
// FUNCIONES DE FILTRADO POR CATEGORÍA
// ============================================

// Función para inicializar filtros de categoría
function inicializarFiltrosCategoria() {
    // Filtros de hamburguesas
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.categoria-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría seleccionada
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar productos
            filtrarProductosPorCategoria(categoria, '.container');
        });
    });
    
    // Filtros de acompañamientos
    document.querySelectorAll('.acompanamiento-filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.acompanamiento-filtro-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría seleccionada
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar productos
            filtrarProductosPorCategoria(categoria, '.acompanamientos-container');
        });
    });
    
    // Filtros de bebidas
    document.querySelectorAll('.bebida-filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.bebida-filtro-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría seleccionada
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar productos
            filtrarProductosPorCategoria(categoria, '.bebidas-container');
        });
    });
}

// Función para filtrar productos por categoría
function filtrarProductosPorCategoria(categoriaSeleccionada, selectorContenedor) {
    const contenedor = document.querySelector(selectorContenedor);
    if (!contenedor) return;
    
    const tarjetas = contenedor.querySelectorAll('.card, .acompanamiento-card, .bebida-card');
    
    tarjetas.forEach(tarjeta => {
        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
        
        if (categoriaSeleccionada === 'todos' || categoriaTarjeta === categoriaSeleccionada) {
            tarjeta.style.display = 'flex';
            tarjeta.style.animation = 'fadeInUp 0.5s ease';
        } else {
            tarjeta.style.display = 'none';
        }
    });
    
    // Mostrar notificación
    if (categoriaSeleccionada !== 'todos') {
        mostrarNotificacion(`Mostrando ${categoriaSeleccionada}`, 'info');
    }
}

// ============================================
// FUNCIÓN PARA INICIALIZAR TODOS LOS BOTONES DE ORDENAR
// ============================================

function inicializarTodosLosBotonesOrdenar() {
    // Función para manejar el clic en botones de ordenar
    function manejarClickOrdenar(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const boton = e.currentTarget;
        const productId = boton.getAttribute('data-product');
        
        if (!productId) {
            console.error('Botón sin data-product:', boton);
            mostrarNotificacion('Error: Producto no identificado', 'error');
            return;
        }
        
        const producto = productosDetalles[productId];
        
        if (producto) {
            agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
        } else {
            console.error('Producto no encontrado:', productId);
            mostrarNotificacion('Error: Producto no disponible', 'error');
        }
    }
    
    // Inicializar botones de ordenar en las tarjetas
    document.querySelectorAll('.order-btn-card, .add-to-cart, .combo-btn').forEach(btn => {
        // Remover event listeners anteriores para evitar duplicados
        const nuevoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(nuevoBtn, btn);
        
        // Agregar event listener
        nuevoBtn.addEventListener('click', manejarClickOrdenar);
    });
    
    // Inicializar botones de detalles
    document.querySelectorAll('.btn-details, .combo-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-product-detail');
            if (productId) {
                mostrarDetallesProducto(productId);
            }
        });
    });
}

// ============================================
// INICIALIZACIÓN MEJORADA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado, inicializando...');
    
    // Inicializar buscador
    inicializarBuscador();
    
    // Inicializar filtro por presupuesto
    inicializarFiltroPresupuesto();
    
    // Inicializar filtros de categoría
    inicializarFiltrosCategoria();
    
    // Configurar botón de cerrar detalles
    const cerrarBtn = document.querySelector('.detalle-cerrar');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', cerrarDetallesProducto);
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    const modal = document.querySelector('.producto-detalle');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarDetallesProducto();
            }
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarDetallesProducto();
            const cartModal = document.getElementById('cart-modal');
            if (cartModal && cartModal.classList.contains('active')) {
                cartModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                resetearPasos();
            }
            
            // Cerrar modales de búsqueda y presupuesto
            const searchModal = document.querySelector('.search-results-modal');
            const budgetModal = document.querySelector('.budget-results-modal');
            
            if (searchModal) {
                searchModal.remove();
                document.body.style.overflow = 'auto';
            }
            
            if (budgetModal) {
                budgetModal.remove();
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Inicializar TODOS los botones de ordenar
    inicializarTodosLosBotonesOrdenar();
    
    // Inicializar carrito
    inicializarModalCarrito();
    
    // Inicializar newsletter
    inicializarNewsletter();
    
    // Agregar estilos de animaciones
    agregarEstilosAnimaciones();
    
    // Inicializar paso actual del carrito
    if (document.getElementById('cart-modal')) {
        actualizarPasos();
    }
    
    // Forzar nueva inicialización después de un tiempo para asegurar que todos los elementos estén cargados
    setTimeout(() => {
        console.log('Re-inicializando botones y filtros...');
        inicializarTodosLosBotonesOrdenar();
        inicializarFiltrosCategoria();
        
        // Activar el filtro "todos" por defecto
        const btnTodos = document.querySelector('.categoria-btn[data-categoria="todos"]');
        if (btnTodos && !btnTodos.classList.contains('active')) {
            btnTodos.classList.add('active');
        }
    }, 500);
});

// ============================================
// NUEVAS FUNCIONES AUXILIARES
// ============================================

// Función para agregar estilos adicionales si es necesario
function agregarEstilosAdicionales() {
    if (document.querySelector('#estilos-adicionales')) return;
    
    const style = document.createElement('style');
    style.id = 'estilos-adicionales';
    style.textContent = `
        /* Mejoras para los botones activos de categoría */
        .categoria-btn.active,
        .acompanamiento-filtro-btn.active,
        .bebida-filtro-btn.active {
            background: linear-gradient(45deg, var(--color-primary), var(--color-primary-light)) !important;
            color: var(--color-white) !important;
            border-color: var(--color-primary) !important;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3) !important;
        }
        
        /* Transición suave para el filtrado */
        .card, .acompanamiento-card, .bebida-card, .combo-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Estado de carga */
        .btn.loading {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .btn.loading .loading-spinner {
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
}

// Agregar estilos adicionales al cargar
agregarEstilosAdicionales();
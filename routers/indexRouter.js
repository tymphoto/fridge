const router = require('express').Router();
const bcrypt = require('bcrypt');
const checkAuth = require('../middlewares/checkAuth');
const { Product, User, Category } = require('../db/models');
const upload = require('../middlewares/upload');

router.route('/')
  .get(async (req, res) => {
    const products = await Product.findAll({
      include: { model: Category },
      where: { user_id: res.locals.userId || 1 },
      // ?? Если так, то показывае что нужно, но валит сервер
      order: [['createdAt', 'ASC']],
    });
    res.render('index', { products });
  });

module.exports = router;

router.route('/register')
  .get(checkAuth, async (req, res) => {
    res.render('register');
  })
  // .get(checkAuth, async (req, res) => {
  //   res.sendStatus(200);
  // })
  .post(checkAuth, async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const hashPass = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
        const user = await User.create({
          email, password: hashPass,
        });
        req.session.userId = user.id;
        res.sendStatus(200);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  });

router.route('/login')
  .get(async (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ where: { email } });
        const passCheck = await bcrypt.compare(password, user.password);
        if (user && passCheck) {
          req.session.userId = user.id;
          req.session.userNickname = user.email;
          res.redirect('/');
        } else {
          res.sendStatus(404);
        }
      }
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }
      res.clearCookie('auth').redirect('/');
    });
  });

router.route('/addProduct')
  .get(async (req, res) => {
    const categories = await Category.findAll();
    res.render('addProduct', { categories });
  });

// router.route('/addProduct')
//   .get(async (req, res) => {
//     const categories = await Category.findAll();
//     res.json(categories);
//   });

router.route('/new')
  .post(upload.single('image'), async (req, res) => {
    req.body.user_id = res.locals.userId;
    if (req.file) {
      await Product.create({ ...req.body, image: req.file.path.replace('public', '') });
    } else {
      await Product.create({ ...req.body });
    }
    res.sendStatus(200);
  });

router.route('/:id')
  .delete(async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  })
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ where: { id } });
      res.json(product);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      await Student.update({ name: req.body.name }, { where: { id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  });

router.route('/search')
  .post(async (req, res) => {
    req.body.user_id = res.locals.userId;
    try {
      const productSearched = await Product.findAll({
        include: { model: Category }, where: { name: req.body.name, user_id: res.locals.userId },
      });
      res.json(productSearched);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

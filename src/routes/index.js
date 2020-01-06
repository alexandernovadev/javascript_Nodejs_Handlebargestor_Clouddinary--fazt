const { Router } = require('express');

const router = Router();
router.get('/', (req, res) => {
  res.json({
    messague: "Test Iniciado"
  })
});


module.exports = router;
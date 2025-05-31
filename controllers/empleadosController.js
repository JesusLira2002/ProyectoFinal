const { Empleado } = require('../models');

exports.crearEmpleado = async (req, res) => {
    const empleado = await Empleado.create(req.body);
    res.json(empleado);
};

exports.obtenerEmpleados = async (req, res) => {
    const { nombre } = req.query;
    const where = nombre ? { nombre } : undefined;
    const empleados = await Empleado.findAll({ where });
    res.json(empleados);
};

exports.actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    await Empleado.update(req.body, { where: { id } });
    res.json({ mensaje: 'Empleado actualizado' });
};

exports.eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    await Empleado.destroy({ where: { id } });
    res.json({ mensaje: 'Empleado eliminado' });
};

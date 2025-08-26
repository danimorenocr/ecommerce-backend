import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los pagos
export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { order: true },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pagos" });
  }
};

// Obtener un pago por ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { order: true },
    });

    if (!payment) return res.status(404).json({ error: "Pago no encontrado" });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pago" });
  }
};

// Crear un pago
export const createPayment = async (req, res) => {
  try {
    const { mpPaymentId, status, statusDetail, amount, currency, payerEmail, orderId } = req.body;

    const newPayment = await prisma.payment.create({
      data: {
        mpPaymentId,
        status,
        statusDetail,
        amount,
        currency,
        payerEmail,
        orderId,
      },
    });

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

// Actualizar un pago
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, statusDetail } = req.body;

    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: { status, statusDetail },
    });

    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};

// Eliminar un pago
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.payment.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pago" });
  }
};

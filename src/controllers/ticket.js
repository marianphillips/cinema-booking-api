const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  const createdTicket = await prisma.ticket.create({
    data: {
      screening: {
        connect: { id: parseInt(screeningId) },
      },
      customer: {
        connect: { id: parseInt(customerId) },
      },
    },

    include: {
      screening: true,
      customer: true,
      },
  });

  res.json({ data: createdTicket });
};

module.exports = {
  createTicket,
};

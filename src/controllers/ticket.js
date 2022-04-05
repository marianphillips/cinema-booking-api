const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  const screeningData = await prisma.screening.findUnique({
      where: {
        id: parseInt(screeningId)
      },
      include : {
          movie: true,
          screen: true
      }
  })

  const customerData = await prisma.customer.findUnique({
    where: {
      id: parseInt(customerId)
    },
    include : {
        contact: true,
    }
})

  console.log(screeningData)

  const createdTicket = await prisma.ticket.create({
    data: {
      screening: {
        connect: { id: parseInt(screeningId) },
      },
      customer: {
        connect: { id: parseInt(customerId) },
      },
    },
  });

  res.json({ 
      data: createdTicket,
      screeningData: screeningData,
      customerData: customerData });
};

module.exports = {
  createTicket,
};

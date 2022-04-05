const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { name, phone, email } = req.body;

    const createdTicket = await prisma.ticket.create({
    data: {
      name,
      contact: {
        create: {
          phone,
          email,
        },
      },
    },
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });

  res.json({ data: createdTicket });
};



module.exports = {
  createTicket
};

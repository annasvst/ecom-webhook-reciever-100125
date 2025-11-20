import { Request, Response } from 'express';
import { endpointSecret, stripe } from '../../../services/stripe';

const receiveUpdates = async (req: Request, res: Response) => {
  let event = req.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    console.log('Signature header', signature);
    console.log('req.body', req.body);
    console.log('endpointSecret', endpointSecret);

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const checkoutSession = event.data.object;
      console.log(`Checkout was successful!`, checkoutSession);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    }
    case 'checkout.session.expired': {
      const checkoutSession = event.data.object;
      console.log(`Checkout wasn't successful!`, checkoutSession);
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(event.data.object);
      break;
    }
    default: {
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

export default {
  receiveUpdates,
};

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm ';

const stripePromise = loadStripe('pk_test_51Jw62PH9mzmHxTRUBtGVnc9rXd5wFMIjw1XlLRs0grcHln6zVTyjUvblGrPniVUAKbhPJthoGFjIRbeJojy8ueTu0020ZEdQRn');

const Payments = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointments] = useState({});

    useEffect(() => {
        axios.get(`https://obscure-chamber-60035.herokuapp.com/payments/${appointmentId}`)
            .then(res => setAppointments(res.data))
    }, [appointmentId])
    return (
        <div>
            <h2>Pay for: {appointment.patientName} of service {appointment.serviceName}</h2>
            <h3>Pay ${appointment.price}</h3>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm appointment={appointment} />
            </Elements>}
        </div>
    );
};

export default Payments;
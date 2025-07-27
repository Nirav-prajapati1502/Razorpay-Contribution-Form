import react, { use, useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2';

function Form() {

    const defaultAmounts = [1000, 2500, 4000];
    const tipOptions = [0, 5, 10, 18];

    const [selectedAmount, setSelectedAmount] = useState(2500);
    const [customAmount, setCustomAmount] = useState('');
    const [tip, setTip] = useState(18);

    const contribution = customAmount || selectedAmount;
    const tipValue = Math.round((tip / 100) * contribution);
    const totalAmount = contribution + tipValue;

    const handleAmountClick = (amt) => {
        setCustomAmount("");
        setSelectedAmount(amt);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        anonymous: false,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let updatedValue = value;

        if (name === "name") {
            updatedValue = value.replace(/[^a-zA-Z\s]/g, '');
        }

        if (name === "phone") {
            updatedValue = value.replace(/[^0-9]/g, '');
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : updatedValue,
        }));
    };

    const validate = () => {
        const err = {};

        if (!formData.name.trim()) {
            err.name = "Field Required";
        }

        if (!formData.email.trim() || !formData.email.includes("@")) {
            err.email = "Field Required";
        }

        if (!formData.phone || formData.phone.length !== 12) {
            err.phone = "Please enter a valid number";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const contributionAmount = Number(customAmount) || Number(selectedAmount);
        const payload = {
            ...formData,
            amount: contributionAmount,
            tip,
        };

        try {
            const res = await fetch('http://localhost:5000/createorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!data || !data.orderId) {
                alert("Failed to create order");
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: data.name,
                order_id: data.orderId,
                handler: function (response) {
                    alert("Payment successful!");
                    console.log("Payment ID:", response.razorpay_payment_id);
                    console.log("Order ID:", response.razorpay_order_id);

                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        anonymous: false,
                    });
                    setSelectedAmount(2500);
                    setCustomAmount("");
                    setTip('18');
                    setErrors({});
                },
                prefill: {
                    name: formData.anonymous ? "" : formData.name,
                    email: formData.anonymous ? "" : formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#01bfbd"
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log("API error:", error);
            alert("Something went wrong while creating order.");
        }
    };

    return (
        <section className="section">
            <div className="container-lg d-flex justify-content-center align-items-center">
                <div className="card m-md-5 m-2 shadow-lg  border-0 align-items-center justify-content-center maincard">
                    <div className="mb-4 p-3 w-100 d-flex justify-content-between header">
                        <i className="bi bi-chevron-left"></i>
                        <h5 className="title text-center">Choose a contribution amount</h5>
                        <i className="bi bi-currency-rupee"></i>
                    </div>
                    <div className="card border-0 mx-5">
                        <div className="text-center mb-3">
                            <p className="small text-muted p1">Most Contributors contribute approx <span className="span">₹2500</span> to this Fundraiser</p>
                            <div className="d-flex mb-3 justify-content-center gap-4">
                                {defaultAmounts.map((amt) => (
                                    <button
                                        key={amt}
                                        className={`btn shadow amountbtn px-4 ${selectedAmount == amt && !customAmount ? "active-amount" : "other-amount"}`}
                                        onClick={() => handleAmountClick(amt)}
                                    >₹ {amt}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                className={`text-center py-2 w-auto shadow amountinput ${customAmount ? "active-amount" : "other-amount"}`}
                                placeholder="Other Amount"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(Number(e.target.value))}
                            />
                        </div>
                        <div className="p-3 mb-4 tipsection">
                            <p className="m-0 small text-muted p2">
                                Ketto is charging 0% platform fee* for this fundraiser,
                                relying solely on the generosity of contributors like you.
                            </p>
                            <div className="d-flex my-3 align-items-center">
                                <label className="mb-0 small p3">
                                    Support us by adding a tip of :
                                    <select
                                        className="form-select form-select-sm shadow d-inline-block w-auto ms-2 tipselect"
                                        value={tip}
                                        onChange={(e) => setTip(Number(e.target.value))}
                                    >
                                        {tipOptions.map((tip) => (
                                            <option key={tip} value={tip} className="tipoptions">
                                                {tip}% (INR {Math.round((tip / 100) * contribution)})
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <p className="text-end small m-0 totalamount">Total Amount : INR {totalAmount}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="forminfo">
                            <div className="mb-3">
                                <div className="position-relative inputdiv">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name *"
                                        className='form-control px-0 inputdata'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <i className="bi bi-person-fill position-absolute top-50 end-0 translate-middle-y"></i>
                                </div>
                                {errors.name && <div className="text-danger small">{errors.name}</div>}
                            </div>
                            <div className="form-check mb-3 checkboxdiv">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="anonymous"
                                    checked={formData.anonymous}
                                    onChange={handleChange}
                                    id="flexCheckDefault" />
                                <label className="form-check-label small text-muted" for="flexCheckDefault">
                                    Make my contribution anonymous
                                </label>
                            </div>
                            <div className="mb-3">
                                <div className="position-relative inputdiv">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email ID *"
                                        className='form-control px-0 inputdata'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <i className="bi bi-envelope-fill position-absolute top-50 end-0 translate-middle-y"></i>
                                </div>
                                {errors.email && <div className="text-danger small">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <div className="position-relative inputdiv">
                                    <PhoneInput
                                        country={'in'}
                                        value={formData.phone}
                                        onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                        }}
                                        containerStyle={{ width: "100%" }}
                                        inputStyle={{
                                            border: 'none',
                                            borderBottom: '2px solid #01bfbd',
                                            borderRadius: 0,
                                            width: '100%',
                                            boxShadow: 'none',
                                            paddingLeft: '48px'
                                        }}
                                        buttonStyle={{
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            marginLeft: '0px'
                                        }}
                                    />

                                    <i className="bi bi-telephone-fill position-absolute top-50 end-0 translate-middle-y"></i>
                                </div>
                                {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                            </div>
                            <div className="mb-3 position-relative inputdiv">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className='form-control px-0 inputdata'
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <i className="bi bi-building position-absolute top-50 end-0 translate-middle-y"></i>
                            </div>
                            <div className="text-center btndiv">
                                <button type="submit" className="btn mb-3 px-3 paymentbutton">Proceed To Contribute ₹ {totalAmount}</button>
                                <p className="small text-muted p1">By continuing, you agree to our <span href="#" className="a">Terms of Service</span> and <span href="#" className="a">Privacy Policy</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Form;
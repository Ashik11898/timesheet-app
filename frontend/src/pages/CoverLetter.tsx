import React, { useState } from "react";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

const CoverLetter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Mohamed Ashik M",
    email: "ashiksalludeen@gmail.com",
    phone: "+91 9566041618",
    company: "Tech Innovators",
    position: "React Developer",
  });

  const { name, email, phone, company, position } = formData;

  const options: Options = {
    filename: "Ashik-Cover-Letter.pdf",
    method: "save",
    resolution: Resolution.MEDIUM,
    page: {
      margin: Margin.MEDIUM,
      format: "letter",
      orientation: "portrait",
    },
    overrides: {
      pdf: { compress: true },
    },
  };

  const getTargetElement = () => document.getElementById("pdf-container");

  const downloadPdf = () => {
    const pdfElement = document.getElementById("pdf-container");
    if (pdfElement) {
      // Temporarily add a class for larger font size during PDF generation
      pdfElement.classList.add("pdf-content");
      generatePDF(getTargetElement, options);
      pdfElement.classList.remove("pdf-content");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 w-100 p-6">
      <div className="w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Cover Letter Generator</h1>

        {/* Form for user input */}
        <div className="space-y-6 mb-6">
          {["name", "email", "phone", "company", "position"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Cover Letter Content */}
        <div
          id="pdf-container"
          className="w-100 mx-auto bg-white p-8 rounded-lg shadow-md"
          style={{
            fontSize: "18px", // Default font size for the component
            lineHeight: "1.6",
          }}
        >
          <p className="text-right text-gray-700">{new Date().toLocaleDateString()}</p>

          <div className="mt-4">
            <p className="text-gray-700">
              <strong>{name}</strong> <br />
              {email} <br />
              {phone}
            </p>
          </div>
          {/* content starts */}

          <div className="mt-6">
  <p className="text-gray-700">Dear Hiring Manager,</p>

  <p className="text-gray-700 mt-4">
    I am writing to apply for the <strong>{position}</strong> role at <strong>{company}</strong>, a company that has revolutionized the way we connect and communicate. As someone who enjoys connecting people through technology, I have always admired how <strong>{company}</strong> has consistently pushed the envelope in digital innovation.
  </p>

  <p className="text-gray-700 mt-4">
    During my time at <strong>Resume Worded</strong>, I led a project to revamp our main product's user interface using <strong>React</strong>. The result was a 30% increase in user engagement and a 20% reduction in loading times. I also created a reusable component library that reduced our development time by 15%. These experiences have equipped me with a deep understanding of <strong>React</strong> and its potential to create intuitive and efficient applications.
  </p>

  <p className="text-gray-700 mt-4">
    What excites me about the role at <strong>{company}</strong> is the opportunity to work on products that impact billions of users. I am looking forward to bringing my expertise in <strong>React</strong> to a company that values innovation and user experience as much as I do.
  </p>

  <p className="text-gray-700 mt-4">
    Thank you for considering my application. I look forward to the opportunity to contribute to <strong>{company}</strong>'s continued success in connecting the world.
  </p>

</div>


            {/* content ends */}

          <div className="mt-6">
            <p className="text-gray-700">Sincerely,</p>
            <p className="text-gray-700">
              <strong>{name}</strong>
            </p>
          </div>
        </div>

        {/* Button to generate PDF */}
        <div className="mt-6 text-center">
          <button
            onClick={downloadPdf}
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;

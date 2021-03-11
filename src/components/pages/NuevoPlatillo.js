import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'



const NuevoPlatillo = () => {



  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
        nombre: '',
        precio: '',
        categoria: '',
        imagen: '',
        descripcion: '',
    }, 
    validationSchema: Yup.object({
        nombre: Yup.string()
                    .min(3, 'Los Platillos deben tener al menos 3 caracteres')
                    .required('El Nombre del platillo es obligatorio'),
        precio: Yup.number()
                    .min(1, 'Debes agregar un número')
                    .required('El Precio es obligatorio'),
        categoria: Yup.string()
                    .required('La categoría es obligatoria'),
        descripcion: Yup.string()
                    .min(10, 'La descripción debe ser más larga')
                    .required('La descripción es obligatoria'),
                    
    }),
    onSubmit: platillo => {
       console.log(platillo)
    }
});


	return (
		<>
			<h1 className="mb-4 text-3xl font-light">Agregar Platillo</h1>

			<div className="flex justify-center mt-10">
				<div className="w-full max-w-3xl">
					<form onSubmit={formik.handleSubmit}>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
								Nombre
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="nombre"
								type="text"
								placeholder="Nombre Platillo"
								value={formik.values.nombre}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur} //unfocused textinput will launch stepValid #1
							/>
						</div>
						{formik.touched.nombre && formik.errors.nombre ? ( //stepValid #1
							<div className="p-4 mb-5 text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
								<p className="font-bold">Hubo un error:</p>
								<p>{formik.errors.nombre} </p>
							</div>
						) : null}

						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="precio">
								Precio
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="precio"
								type="number"
								placeholder="$20"
								min="0"
								value={formik.values.precio}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.precio && formik.errors.precio ? (
							<div className="p-4 mb-5 text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
								<p className="font-bold">Hubo un error:</p>
								<p>{formik.errors.precio} </p>
							</div>
						) : null}

						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
								Categoría
							</label>
							<select
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="precio"
								name="categoria"
								value={formik.values.categoria}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								<option value="">-- Seleccione --</option>
								<option value="desayuno">Desayuno</option>
								<option value="comida">Comida</option>
								<option value="cena">Cena</option>
								<option value="bebida">Bebidas</option>
								<option value="postre">Postre</option>
								<option value="ensalada">Ensalada</option>
							</select>
						</div>

						{formik.touched.categoria && formik.errors.categoria ? (
							<div className="p-4 mb-5 text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
								<p className="font-bold">Hubo un error:</p>
								<p>{formik.errors.categoria} </p>
							</div>
						) : null}

					

						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="descripcion">
								Descripción
							</label>
							<textarea
								className="w-full h-40 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="descripcion"
								placeholder="Descripción del Platillo"
								value={formik.values.descripcion}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							></textarea>
						</div>

						{formik.touched.descripcion && formik.errors.descripcion ? (
							<div className="p-4 mb-5 text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
								<p className="font-bold">Hubo un error:</p>
								<p>{formik.errors.descripcion} </p>
							</div>
						) : null}

						<input
							type="submit"
							className="w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900"
							value="Agregar Platillo"
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default NuevoPlatillo;

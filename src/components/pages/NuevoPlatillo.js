import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {
	// Context con las operaciones de firebase
	const { firebase } = useContext(FirebaseContext);

	// state para las imagenes
	const [subiendo, guardarSubiendo] = useState(false);
	const [progreso, guardarProgreso] = useState(0);
	const [urlimagen, guardarUrlimagen] = useState('');
	// Manejando estados de progreso y mas de imagen
	const handleUploadStart = () => {
		guardarProgreso(0);
		guardarSubiendo(true);
	};
	const handleUploadError = (error) => {
		guardarSubiendo(false);
		console.log(error);
	};
	const handleUploadSuccess = async (nombre) => {
		guardarProgreso(100);
		guardarSubiendo(false);

		// Almacenar la URL de destino
		const url = await firebase.storage.ref('productos').child(nombre).getDownloadURL();

		console.log(url);
		guardarUrlimagen(url);
	};
	const handleProgress = (progreso) => {
		guardarProgreso(progreso);

	};

	// Hook para redireccionar
	const navigate = useNavigate();

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
			precio: Yup.number().min(1, 'Debes agregar un número').required('El Precio es obligatorio'),
			categoria: Yup.string().required('La categoría es obligatoria'),
			descripcion: Yup.string()
				.min(10, 'La descripción debe ser más larga')
				.required('La descripción es obligatoria'),
		}),
		onSubmit: (platillo) => {
			//console.log(platillo)
			platillo.existencia = true;
			platillo.imagen = urlimagen;
			firebase.db.collection('productos').add(platillo);

			// Redireccionar
			navigate('/menu'); //in RRD is navigate and not history
		},
	});

	return (
		<div className="ml-80">
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
							<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="imagen">
								Imagen
							</label>
							<FileUploader
								accept="image/*"
								id="imagen"
								name="imagen"
								randomizeFilename
								storageRef={firebase.storage.ref('productos')}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
								onProgress={handleProgress}
							/>
						</div>

						{subiendo && (
							<div className="relative w-full h-12 border">
								<div
									className={"absolute top-0 left-0 flex items-center h-12 px-2 text-sm text-white bg-green-500"}
									style={{ width: `${progreso}%` }}
								>
									{progreso} %
								</div>
							</div>
						)}

						{urlimagen && (
							<p className="p-3 my-5 text-center text-white bg-green-500">
								La imagen se subió correctamente
							</p>
						)}

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
		</div>
	);
};

export default NuevoPlatillo;

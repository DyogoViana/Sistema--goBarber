import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';
import api from '~/services/api';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
	const { email, password } = payload;
	const response = yield call(api.post, 'sessions', {
		email,
		password,
	});

	const { token, user } = response.data;

	// Quando o usuário não for um prestador do serviço.
	if (!user.provider) {
		console.tron.error('Usuário NÃO é um prestador do serviço.');
		return;
	}

	yield put(signInSuccess(token, user));

	history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

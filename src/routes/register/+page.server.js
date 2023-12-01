import { redirect } from '@sveltejs/kit';
import { generateUsername } from '../../lib/utils';
 
export const actions = {
    register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        let username = generateUsername(body.name.split(' ').join('')).toLowerCase()


        try{
            await locals.pb.collection('users').create({username, ...body})
            await locals.pb.collection('users').requestVerification(body.email)
        } catch (error) {
            console.log('Error:', error)
            throw error(500, 'SOmething went wrong')
        } 

        throw redirect(303, '/login')
    }
};
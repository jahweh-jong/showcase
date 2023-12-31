import { redirect, error } from '@sveltejs/kit'
import { serializeNonPOJOs } from '$lib/utils'


export const load = ({ locals, params }) => {
    const getProject = async (projectId) => {
        try {
            const project = serializeNonPOJOs(await locals.pb.collection('projects').getOne(projectId))
            return project
        } catch (err) {
            console.log('Error: ', err)
            throw error(err.status, err.message)
        }
    }

    return {
        project: getProject(params.projectId)
    }
}
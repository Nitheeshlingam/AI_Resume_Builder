import { Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = () => {
    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: ""
        };
        onChange([...data, newExperience]);
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const upadateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                        Projects
                    </h3>
                    <p className='text-sm text-gray-500'>Add Your Projects
                    </p>
                </div>
                <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className='size-4' />
                    Add Project
                </button>
            </div>

            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Project #{index + 1}</h4>
                            <button onClick={() => removeProject(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={project.name || ""} onChange={(e) => updateEducation(index, "name", e.target.value)} type="text" placeholder='Project Name' className='px-3 py-2 text-sm rounded-lg' />

                            <input value={project.type || ""} onChange={(e) => upadateProject(index, "name", e.target.value)} type="text" placeholder='Project Type' className='px-3 py-2 text-sm rounded-lg' />

                            <textarea rows={4} value={project.description || ""} onChange={(e) => upadateProject(index, "description", e.target.value)} type="text" placeholder='Describe your project... ' className='px-3 py-2 text-sm rounded-lg resize-none' />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ProjectForm
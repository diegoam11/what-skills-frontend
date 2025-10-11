import { useState, useEffect } from 'react';
import type { Skill } from '../../types';

const fetchUserSkills = async (): Promise<Skill[]> => {
    console.log("Fetching user skills...");
    const mockSkills: Skill[] = [
        { id: 's1', name: 'Python', category: 'lenguaje', proficiency: 'avanzado' },
        { id: 's2', name: 'React', category: 'framework', proficiency: 'intermedio' },
        { id: 's3', name: 'Docker', category: 'herramienta', proficiency: 'intermedio' },
        { id: 's4', name: 'Comunicación', category: 'blanda', proficiency: 'avanzado' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockSkills), 500));
};

export const useSkillsLogic = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSkills = async () => {
            setIsLoading(true);
            const data = await fetchUserSkills();
            setSkills(data);
            setIsLoading(false);
        };
        loadSkills();
    }, []);

    const handleDeleteSkill = (skillId: string) => {
        console.log("Deleting skill:", skillId);
        setSkills(currentSkills => currentSkills.filter(s => s.id !== skillId));
        // TODO: Implementar llamada a la API para eliminar la habilidad
    };
    
    const handleAddSkill = (newSkill: {name: string, proficiency: string}) => {
        console.log("Adding skill:", newSkill);
        const skillToAdd: Skill = {
            id: `s${Date.now()}`, // ID temporal
            name: newSkill.name,
            category: 'herramienta', // Categoría por defecto
            proficiency: newSkill.proficiency as Skill['proficiency']
        }
        setSkills(currentSkills => [...currentSkills, skillToAdd]);
        // TODO: Implementar llamada a la API para añadir la habilidad
    }

    return { skills, isLoading, handleDeleteSkill, handleAddSkill };
};
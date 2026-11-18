# Fuente de consumo remota

El canal de respaldo y distribución es GitHub, `Migueluckleo/Blue-Heart-DS`, rama `main`. Los lanzadores existentes fijan un commit y usan `scripts/github_workflow.py`; conservan comprobación de hashes y sesión por encargo. `release.skill_name` y `release.companion_skill` identifican las skills de este canal.

La nueva skill autónoma `blueheart-po-prototypes-offline` consume exclusivamente su corte local incluido y no usa este arranque remoto. Trabajar con fuentes locales o preparar paquetes no autoriza publicar ni ejecutar pushes.

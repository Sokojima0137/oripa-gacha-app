package mysql

import (
	"database/sql"
	"gacha-backend/domain/pack"
)

type PackRepository struct {
	DB *sql.DB
}

func (r *PackRepository) FindAll() ([]pack.Pack, error) {
	rows, err := r.DB.Query("SELECT id, name, image_url, description, created_at FROM pack")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var packs []pack.Pack
	for rows.Next() {
		var p pack.Pack
		if err := rows.Scan(&p.ID, &p.Name, &p.ImageURL, &p.Description, &p.CreatedAt); err == nil {
			packs = append(packs, p)
		}
	}
	return packs, nil
}

func (r *PackRepository) FindByID(id int) (*pack.Pack, error) {
	var p pack.Pack
	err := r.DB.QueryRow("SELECT id, name, image_url, description, created_at FROM pack WHERE id = ?", id).
		Scan(&p.ID, &p.Name, &p.ImageURL, &p.Description, &p.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &p, nil
}
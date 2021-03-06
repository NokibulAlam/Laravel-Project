<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class BaseRepositories
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $attributes
     * @return mixed
     */

    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * @param array $attributes
     * @param int $id
     * @return mixed
     */

    public function update(array $attributes, int $id) :bool
    {
        return $this->model->find($id)->update($attributes);
    }

    /**
     * @param array $attributes
     * @param array $search_data
     * @return mixed
     */

    public function updateOrCreate(array $search_data, array $attributes)
    {
        return $this->model->updateOrCreate($search_data,$attributes);
    }

    /**
     * @param array $attributes
     * @param array $search_data
     * @return mixed
     */

    public function updateOrInsert(array $search_data, array $attributes)
    {
        return $this->model->updateOrInsert($search_data,$attributes);
    }

    /**
     * @param array $cplumn
     * @param string $orderBy
     * @param string $sortBy
     * @return mixed
     */

    public function all($column = array('*'), string $orderBy = 'id', string $sortBy = 'disc')
    {
        return $this->model->orderBy($orderBy, $sortBy)->get($column);
    }

    /**
     * @param int $id
     * @return mixed
     */

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    /**
     * @param int $id
     * @return mixed
     * @throws ModelNotFoundException
     */

    public function findOrFail(int $id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * @param array @data
     * @return mixed
     */

    public function findBy(array $data)
    {
        return $this->model->where($data)->get();
    }

    /**
     * @param array @data
     * @return mixed
     */

    public function findOneBy(array $data)
    {
        return $this->model->where($data)->first();
    }

    /**
     * @param array @data
     * @return mixed
     * @throws ModelNotFoundException
     */

    public function findOneByFail(array $data)
    {
        return $this->model->where($data)->firstOrFail();
    }

    /**
     * @param int $id
     * @return bool
     */

    public function delete(int $id) : bool
    {
        return $this->model->find($id)->delete();
    }

    /**
     * @param array $data
     * @return bool
     */

    public function destroy(array $data) : bool
    {
        return $this->model->destroy($data);
    }



}
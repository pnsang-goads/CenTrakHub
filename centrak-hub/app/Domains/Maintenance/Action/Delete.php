<?php declare(strict_types=1);

namespace App\Domains\Maintenance\Action;

class Delete extends ActionAbstract
{
    /**
     * @return void
     */
    public function handle(): void
    {
        $this->delete();
        $this->files();
    }

    /**
     * @return void
     */
    protected function delete(): void
    {
        $this->row->delete();
    }

    /**
     * @return void
     */
    protected function files(): void
    {
        foreach ($this->row->files as $file) {
            $this->factory('File', $file)->action()->delete();
        }
    }
}
